import { Category, TaskData } from "@types";
import mysql, { RowDataPacket, Connection } from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "rootpassdev",
  database: "tfgsff_db",
};

interface TaskDataBBDD extends RowDataPacket {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  priority: "NONE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: Date;
  idWorkspace: number;
  categories: string;
}

export class ModelTask {
  constructor() {}

  async getTasksByIdWorkspace(idWorkspace: number): Promise<TaskData[]> {
    const connection: Connection = await mysql.createConnection(config);

    const [result] = await connection.query<TaskDataBBDD[]>(
      `
		SELECT
      t.id,
      t.name,
      t.createdAt,
      t.idWorkspace,
      t.description,
      t.completed,
      t.deadline,
      t.priority,
      t.visibility,
      CONCAT(
          '[',
          CASE
            WHEN COUNT(c.id) > 0 THEN
              GROUP_CONCAT(
                JSON_OBJECT(
                  'id', c.id,
                  'name', c.name,
                  'description', c.description,
		  						'color', c.color,
		  						'completed', c.completed,
									'idWorkspace', c.idWorkspace
                )
            ORDER BY c.id
          )
          ELSE
            ''
          END,
          ']'
      ) AS categories
    FROM
      task t
    LEFT JOIN
      taskCategory tc ON t.id = tc.idTask
    LEFT JOIN
      category c ON tc.idCategory = c.id
    WHERE
      t.idWorkspace = ?
    GROUP BY
      t.id, t.name
		`,
      [idWorkspace],
    );

    await connection.end();

    return result.map((task: TaskDataBBDD): TaskData => {
      return {
        id: task.id,
        name: task.name,
        createdAt: task.createdAt,
        idWorkspace: task.idWorkspace,
        description: task.description,
        completed: task.completed,
        deadline: task.deadline,
        priority: task.priority,
        visibility: task.visibility,
        categories: JSON.parse(task.categories) as Category[],
      };
    });
  }
}

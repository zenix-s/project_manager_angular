import mysql, { Connection, RowDataPacket } from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "rootpassdev",
  database: "tfgsff_db",
};

interface CategoryBBDD extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  color: string;
  completed: boolean;
  idWorkspace: number;
}

export class ModelCategory {
  constructor() {}

  // async getCategoryById(idCategory: number): Promise<Category> {
  //   const connection: Connection = await mysql.createConnection(config);

  // }

  // async getTasksByIdWorkspace(idWorkspace: number): Promise<TaskData[]> {
  //   const connection: Connection = await mysql.createConnection(config);

  //   const [result] = await connection.query<TaskDataBBDD[]>(
  //     `
  // SELECT
  //     t.id,
  //     t.name,
  //     t.createdAt,
  //     t.idWorkspace,
  //     t.description,
  //     t.completed,
  //     t.deadline,
  //     t.priority,
  //     t.visibility,
  //     CONCAT(
  //         '[',
  //         CASE
  //           WHEN COUNT(c.id) > 0 THEN
  //             GROUP_CONCAT(
  //               JSON_OBJECT(
  //                 'id', c.id,
  //                 'name', c.name,
  //                 'description', c.description,
  //   						'color', c.color,
  //   						'completed', c.completed,
  // 							'idWorkspace', c.idWorkspace
  //               )
  //           ORDER BY c.id
  //         )
  //         ELSE
  //           ''
  //         END,
  //         ']'
  //     ) AS categories
  //   FROM
  //     task t
  //   LEFT JOIN
  //     taskCategory tc ON t.id = tc.idTask
  //   LEFT JOIN
  //     category c ON tc.idCategory = c.id
  //   WHERE
  //     t.idWorkspace = ?
  //   GROUP BY
  //     t.id, t.name
  // `,
  //     [idWorkspace],
  //   );

  //   await connection.end();

  //   return result.map((task: TaskDataBBDD): TaskData => {
  //     return {
  //       id: task.id,
  //       name: task.name,
  //       createdAt: task.createdAt,
  //       idWorkspace: task.idWorkspace,
  //       description: task.description,
  //       completed: task.completed,
  //       deadline: task.deadline,
  //       priority: task.priority,
  //       visibility: task.visibility,
  //       categories: JSON.parse(task.categories) as Category[],
  //     };
  //   });
  // }

  // async addTask(task: Task): Promise<number> {
  //   const connection: Connection = await mysql.createConnection(config);

  //   const [result] = await connection.query<ResultSetHeader>(
  //     `
  //         INSERT INTO task (name, idWorkspace, description, completed, deadline, priority, visibility, createdAt)
  //         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())

  //     `,
  //     [
  //       task.name,
  //       task.idWorkspace,
  //       task.description,
  //       task.completed,
  //       task.deadline,
  //       task.priority,
  //       task.visibility,
  //     ],
  //   );
  //   await connection.end();

  //   return result.insertId;
  // }

  // async deleteTaskById(idTask: number): Promise<number> {
  //   const connection: Connection = await mysql.createConnection(config);

  //   const result = await connection.query(
  //     `
  //         DELETE FROM task
  //         WHERE id = ?

  //     `,
  //     [idTask],
  //   );

  //   await connection.end();

  //   return idTask;
  // }

  async getCategoriesByIdWorkspace(
    idWorkspace: number,
  ): Promise<CategoryBBDD[]> {
    const connection: Connection = await mysql.createConnection(config);

    const [result] = await connection.query<CategoryBBDD[]>(
      ` SELECT
          c.id,
          c.name,
          c.description,
          c.color,
          c.completed,
          c.idWorkspace
        FROM
          category c
        WHERE
          c.idWorkspace = ?
       `,
      [idWorkspace],
    );

    await connection.end();

    return result;
  }
}

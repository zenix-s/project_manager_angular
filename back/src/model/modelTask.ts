import { Category, Task, TaskData, subtask } from "@types";
import mysql, {
  RowDataPacket,
  Connection,
  ResultSetHeader,
} from "mysql2/promise";

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
  dependentIdTask: number;
  categories: string;
  subtasks: string;
}

export class ModelTask {
  constructor() {}

  async getTaskById(idTask: number): Promise<TaskData> {
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
			t.dependentIdTask,
			CASE
				WHEN COUNT(c.id) > 0 THEN JSON_ARRAYAGG (
					JSON_OBJECT (
						'id',
						c.id,
						'name',
						c.name,
						'description',
						c.description,
						'color',
						c.color,
						'completed',
						c.completed,
						'idWorkspace',
						c.idWorkspace
					)
				)
				ELSE JSON_ARRAY ()
			END AS categories,
			CASE
				WHEN COUNT(t2.id) > 0 THEN JSON_ARRAYAGG (
					JSON_OBJECT (
						'id',
						t2.id,
						'name',
						t2.name,
						'description',
						t2.description,
						'createdAt',
						t2.createdAt,
						'completed',
						t2.completed,
						'deadline',
						t2.deadline,
						'priority',
						t2.priority,
						'visibility',
						t2.visibility,
						'dependentIdTask',
						t2.dependentIdTask,
						'categories',
						(
							SELECT
								JSON_ARRAYAGG (
									JSON_OBJECT (
										'id',
										c.id,
										'name',
										c.name,
										'description',
										c.description,
										'color',
										c.color,
										'completed',
										c.completed,
										'idWorkspace',
										c.idWorkspace
									)
								)
							FROM
								taskCategory tc
								LEFT JOIN category c ON tc.idCategory = c.id
							WHERE
								tc.idTask = t2.id
						)
					)
				)
				ELSE JSON_ARRAY ()
			END AS subtasks
		FROM
			task t
			LEFT JOIN taskCategory tc ON t.id = tc.idTask
			LEFT JOIN category c ON tc.idCategory = c.id
			LEFT JOIN task t2 ON t2.dependentIdTask = t.id AND t2.deleted = 0
		WHERE
			t.id = ?
			AND t.deleted = 0
		GROUP BY
			t.id,
			t.name;

      `,
      [idTask]
    );

    await connection.end();


    const resultParsed: TaskData[] = result.map(
      (task: TaskDataBBDD): TaskData => {
        return {
          id: task.id,
          name: task.name,
          description: task.description,
          completed: task.completed,
          deadline: task.deadline,
          priority: task.priority,
          visibility: task.visibility,
          createdAt: task.createdAt,
          idWorkspace: task.idWorkspace,
          dependentIdTask: task.dependentIdTask,
          categories: JSON.parse(task.categories),
          subtasks: JSON.parse(task.subtasks),
        };
      }
    );

    return resultParsed[0];
  }

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
	t.dependentIdTask,
	CASE
		WHEN COUNT(c.id) > 0 THEN JSON_ARRAYAGG (
			JSON_OBJECT (
				'id',
				c.id,
				'name',
				c.name,
				'description',
				c.description,
				'color',
				c.color,
				'completed',
				c.completed,
				'idWorkspace',
				c.idWorkspace
			)
		)
		ELSE JSON_ARRAY ()
	END AS categories,
	CASE
		WHEN COUNT(t2.id) > 0 THEN JSON_ARRAYAGG (
			JSON_OBJECT (
				'id',
				t2.id,
				'name',
				t2.name,
				'description',
				t2.description,
				'createdAt',
				t2.createdAt,
				'completed',
				t2.completed,
				'deadline',
				t2.deadline,
				'priority',
				t2.priority,
				'visibility',
				t2.visibility,
				'dependentIdTask',
				t2.dependentIdTask,
				'categories',
				(
					SELECT
						JSON_ARRAYAGG (
							JSON_OBJECT (
								'id',
								c.id,
								'name',
								c.name,
								'description',
								c.description,
								'color',
								c.color,
								'completed',
								c.completed,
								'idWorkspace',
								c.idWorkspace
							)
						)
					FROM
						taskCategory tc
						LEFT JOIN category c ON tc.idCategory = c.id
					WHERE
						tc.idTask = t2.id
				)
			)
		)
		ELSE JSON_ARRAY ()
	END AS subtasks
FROM
	task t
	LEFT JOIN taskCategory tc ON t.id = tc.idTask
	LEFT JOIN category c ON tc.idCategory = c.id
	LEFT JOIN task t2 ON t2.dependentIdTask = t.id AND t2.deleted = 0
WHERE
	t.idWorkspace = ?
	AND t.deleted = 0
	AND t.dependentIdTask IS NULL
GROUP BY
	t.id,
	t.name;
			`,
      [idWorkspace]
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
        dependentIdTask: task.dependentIdTask,
        categories: JSON.parse(task.categories) as Category[],
        subtasks: JSON.parse(task.subtasks) as subtask[],
      };
    });
  }

  async addTask(task: Task): Promise<number> {
    const connection: Connection = await mysql.createConnection(config);

    const [result] = await connection.query<ResultSetHeader>(
      `
          INSERT INTO task (name, idWorkspace, description, completed, deadline, priority, visibility, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, NOW())

      `,
      [
        task.name,
        task.idWorkspace,
        task.description,
        task.completed,
        task.deadline,
        task.priority,
        task.visibility,
      ]
    );
    await connection.end();

    return result.insertId;
  }

  async deleteTaskById(idTask: number): Promise<number> {
    const connection: Connection = await mysql.createConnection(config);

    await connection.query(
      `
        UPDATE task
        SET deleted = 1
        WHERE id = ?
      `,
      [idTask]
    );

    await connection.end();

    return idTask;
  }
}

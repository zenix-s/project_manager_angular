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
	(
		SELECT
			JSON_ARRAYAGG (
				JSON_OBJECT (
					st.id,
					st.name,
					st.createdAt,
					st.idWorkspace,
					st.description,
					st.completed,
					st.deadline,
					st.priority,
					st.visibility,
					st.dependentIdTask,
					'categories',
					(
						SELECT
							JSON_ARRAYAGG (
								JSON_OBJECT (
									sc.id,
									sc.name,
									sc.color,
									sc.description,
									sc.completed,
									sc.createdAt,
									sc.idWorkspace,
									sc.deleted
								)
							)
						FROM
							category sc
							LEFT JOIN taskCategory stc ON sc.id = stc.idCategory
						WHERE
							stc.idTask = st.id
							AND sc.deleted = 0
					)
				)
			) AS dependents
		FROM
			task st
		WHERE
			st.dependentIdTask = t.id
			AND st.deleted = 0
	) AS subtasks,
	(
		SELECT
			JSON_ARRAYAGG (
				JSON_OBJECT (
					c.id,
					c.name,
					c.color,
					c.description,
					c.completed,
					c.createdAt,
					c.idWorkspace,
					c.deleted
				)
			)
		FROM
			category c
			LEFT JOIN taskCategory tc ON c.id = tc.idCategory
		WHERE
			tc.idTask = t.id
			AND c.deleted = 0
	) AS categories
FROM
	task t
WHERE
	t.id = ?
	AND t.deleted = 0

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
          // categories: JSON.parse(task.categories),
          // subtasks: JSON.parse(task.subtasks),
					categories: task.categories ? JSON.parse(task.categories) as Category[] : [],
					subtasks: task.subtasks ? JSON.parse(task.subtasks) as subtask[] : [],
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
			(
				SELECT
					JSON_ARRAYAGG (
						JSON_OBJECT (
							'id',
							st.id,
							'name',
							st.name,
							'createdAt',
							st.createdAt,
							'idWorkspace',
							st.idWorkspace,
							'description',
							st.description,
							'completed',
							st.completed,
							'deadline',
							st.deadline,
							'priority',
							st.priority,
							'visibility',
							st.visibility,
							'dependentIdTask',
							st.dependentIdTask,
							'categories',
							(
								SELECT
									JSON_ARRAYAGG (
										JSON_OBJECT (
											'subtaskId',
											sc.id,
											'name',
											sc.name,
											'color',
											sc.color,
											'description',
											sc.description,
											'completed',
											sc.completed,
											'createdAt',
											sc.createdAt,
											'idWorkspace',
											sc.idWorkspace,
											'deleted',
											sc.deleted
										)
									)
								FROM
									category sc
									LEFT JOIN taskCategory stc ON sc.id = stc.idCategory
								WHERE
									stc.idTask = st.id
									AND sc.deleted = 0
							)
						)
					)
				FROM
					task st
				WHERE
					st.dependentIdTask = t.id
					AND st.deleted = 0
			) AS subtasks,
			(
				SELECT
					JSON_ARRAYAGG (
						JSON_OBJECT (
							'id',
							c.id,
							'name',
							c.name,
							'color',
							c.color,
							'description',
							c.description,
							'completed',
							c.completed,
							'createdAt',
							c.createdAt,
							'idWorkspace',
							c.idWorkspace,
							'deleted',
							c.deleted
						)
					)
				FROM
					category c
					LEFT JOIN taskCategory tc ON c.id = tc.idCategory
				WHERE
					tc.idTask = t.id
					AND c.deleted = 0
			) AS categories
		FROM
			task t
		WHERE
			t.idWorkspace = ?
			AND t.deleted = 0
			AND t.dependentIdTask IS NULL
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
        // categories: JSON.parse(task.categories) as Category[],
				categories: task.categories ? JSON.parse(task.categories) as Category[] : [],
        // subtasks: JSON.parse(task.subtasks) as subtask[],
				subtasks: task.subtasks ? JSON.parse(task.subtasks) as subtask[] : [],
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

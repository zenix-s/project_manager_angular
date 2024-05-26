import { Category, Task, TaskData  } from "@types";
import mysql, {
  RowDataPacket,
  Connection,
  ResultSetHeader,
} from "mysql2/promise";
import {dbconfig as config} from "@/lib/mysqldb"
import { json } from "express";

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

	async taskExists(idTask: number): Promise<boolean> {
		const connection: Connection = await mysql.createConnection(config);

		const [result] = await connection.query<RowDataPacket[]>(
			`
				SELECT id
				FROM task
				WHERE id = ?
			`,
			[idTask]
		);

		await connection.end();

		return result.length > 0;
	}

  async getTaskDataById(idTask: number): Promise<TaskData> {
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
									'id',
									sc.id,
									'name',
									sc.name,
									'color',
									sc.color,
									'description',
									sc.description,
									'completed',
									sc.completed,
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
	t.id = ?
	AND t.deleted = 0

      `,
      [idTask]
    );

    await connection.end();


    const resultParsed: TaskData[] = result.map(
      (task: TaskDataBBDD): TaskData => {
        return {
					task : {
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
					},
          // categories: JSON.parse(task.categories),
          // subtasks: JSON.parse(task.subtasks),
					categories: task.categories ? JSON.parse(task.categories) as Category[] : [],
					// subtasks: task.subtasks ? JSON.parse(task.subtasks) as TaskData[] : [],
					subtasks: task.subtasks ? JSON.parse(task.subtasks).map((subtask: {
						id: number;
						name: string;
						createdAt: Date;
						idWorkspace: number;
						description: string;
						completed: boolean;
						deadline: Date;
						priority: "NONE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
						visibility: "PUBLIC" | "PRIVATE";
						dependentIdTask: number;
						categories: Category[];
					}): TaskData => {
						return {
							task:{
								id: subtask.id,
								name: subtask.name,
								description: subtask.description,
								completed: subtask.completed,
								deadline: subtask.deadline,
								priority: subtask.priority,
								visibility: subtask.visibility,
								createdAt: subtask.createdAt,
								idWorkspace: subtask.idWorkspace,
								dependentIdTask: subtask.dependentIdTask,
							},
							categories: subtask.categories ? subtask.categories : [],
							subtasks: [],
						};
					}
					) : [],
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
											'id',
											sc.id,
											'name',
											sc.name,
											'color',
											sc.color,
											'description',
											sc.description,
											'completed',
											sc.completed,
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
				task:{
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
				},
				categories: task.categories ? JSON.parse(task.categories) as Category[] : [],
				subtasks: task.subtasks ? JSON.parse(task.subtasks).map((subtask: {
					id: number;
					name: string;
					createdAt: Date;
					idWorkspace: number;
					description: string;
					completed: boolean;
					deadline: Date;
					priority: "NONE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
					visibility: "PUBLIC" | "PRIVATE";
					dependentIdTask: number;
					categories: Category[];
				}): TaskData => {
					return {
						task:{
							id: subtask.id,
							name: subtask.name,
							description: subtask.description,
							completed: subtask.completed,
							deadline: subtask.deadline,
							priority: subtask.priority,
							visibility: subtask.visibility,
							createdAt: subtask.createdAt,
							idWorkspace: subtask.idWorkspace,
							dependentIdTask: subtask.dependentIdTask,
						},
						categories: subtask.categories ? subtask.categories : [],
						subtasks: [],
					};
				}) : [],
      };
    });
  }

  async addTask(task: Task): Promise<number> {
    const connection: Connection = await mysql.createConnection(config);

		if (task.deadline) {
			task.deadline = new Date(task.deadline);
		}

		if (task.completed === undefined) {
			task.completed = false;
		}

		if (task.priority === undefined || task.priority === null) {
			task.priority = "NONE";
		}

		if (task.visibility === undefined || task.visibility === null) {
			task.visibility = "PUBLIC";
		}

		

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

	async updateTask(task: Task): Promise<number> {
		const connection: Connection = await mysql.createConnection(config);

		if (task.deadline) {
			task.deadline = new Date(task.deadline);
		}
		await connection.query(
			`
				UPDATE task
				SET name = ?, description = ?, completed = ?, deadline = ?, priority = ?, visibility = ?, dependentIdTask = ?
				WHERE id = ?
			`,
			[
				task.name,
				task.description,
				task.completed,
				task.deadline,
				task.priority,
				task.visibility,
				task.dependentIdTask,
				task.id,
			]
		);

		await connection.end();

		return task.id;
	}
}

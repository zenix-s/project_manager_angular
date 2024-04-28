import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Category, Workspace } from "../interfaces/interfaces";

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

interface CategoryDataBBDD extends RowDataPacket {
  id: number;
  name: string;
}

export class ModelWorkspace {
  constructor() {}

  async getWorkspacesByIdUser(idUser: number) {
    const connection = await mysql.createConnection(config);

    const [result] = await connection.query<TaskDataBBDD[]>(
      `
			SELECT
				w.id,
				w.name,
				w.description,
				w.createdAt
			FROM
				workspace w
			INNER JOIN
				userWorkspace uw
			ON
				w.id = uw.idWorkspace
			WHERE
				uw.idUser = ?
			`,
      [idUser],
    );

    await connection.end();

    return result;
  }

  async deleteWorkspace(idWorkspace: number): Promise<boolean> {
    return true;
  }

	async workspaceExists(idWorkspace: number): Promise<boolean> {
		const connection = await mysql.createConnection(config);



		const [result] = await connection.query<RowDataPacket[]>(
			`
			SELECT
				id,
				name,
				description,
				createdAt
			FROM
				workspace
			WHERE
				id = ? AND deleted = 0
			`,
			[idWorkspace],
		);

		await connection.end();

		return result.length > 0;
	}

	async addWorkspace(workspace: Workspace): Promise<number> {
		const connection = await mysql.createConnection(config);

		const [result] = await connection.query<ResultSetHeader>(
			`
			INSERT INTO workspace (name, description, createdAt, deleted)
			VALUES (?, ?, ?, 0)
			`,
			[workspace.name, workspace.description, new Date()],
		);

		await connection.end();

		return result.insertId;
	}

}

import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Workspace } from "@types";
import { dbconfig as config } from "@/lib/mysqldb";

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

export class WorkspaceModel {
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
				uw.idUser = ? AND w.deleted = 0
			`,
      [idUser]
    );

    await connection.end();

    return result;
  }

  async deleteWorkspace(idWorkspace: number): Promise<number> {
    // return true;
		const connection = await mysql.createConnection(config);

		await connection.query(
			`
			UPDATE
				workspace
			SET
				deleted = 1
			WHERE
				id = ?
			`,
			[idWorkspace]
		);

		await connection.end();

		return idWorkspace;
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
      [idWorkspace]
    );

    await connection.end();

    return result.length > 0;
  }

  async addWorkspace(idUser: number, workspace: Workspace): Promise<number> {
    const connection = await mysql.createConnection(config);

    const [result] = await connection.query<ResultSetHeader>(
      `
			INSERT INTO workspace (name, description, createdAt, deleted)
			VALUES (?, ?, ?, 0)
			`,
      [workspace.name, workspace.description, new Date()]
    );

    if (result.insertId !== 0) {
      await connection.query(
        `
				INSERT INTO userWorkspace (idUser, idWorkspace, role, deleted)
				VALUES (?, ?, 'ADMIN', 0)
				`,
        [idUser, result.insertId]
      );
    }

    await connection.end();

    return result.insertId;
  }
	
}

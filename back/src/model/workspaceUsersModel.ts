import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { UserWorkspace, User, workspaceUsersData } from "@types";
import { dbconfig } from "@/lib/mysqldb";

interface UserBBDD extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  role: string;
  idUserWorkspace: number;
}

export class WorkspaceUsersModel {
  async getWorkspaceUsers(workspaceId: number): Promise<workspaceUsersData[]> {
    // array de workspaceUsersData que tiene User y UserWorkspace

    const connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query(
      `
			SELECT
				'id',
				u.id,
				'username',
				u.username,
				'email',
				u.email,
				'createdAt',
				u.createdAt,
				'role',
				uw.role,
				'idUserWorkspace',
				uw.id
			FROM
				user u
			INNER JOIN
				userWorkspace uw
			ON
				u.id = uw.idUser
			WHERE
				uw.idWorkspace = ? AND uw.deleted = 0
				
			`,
      [workspaceId]
    );

		const [ids] = await connection.query(
			`
			SELECT
				*
			FROM
				user u
			INNER JOIN
				userWorkspace uw
			ON
				u.id = uw.idUser
			WHERE
				uw.idWorkspace = ? AND uw.deleted = 0
			`,
			[workspaceId]
		);

		console.log(ids);
    await connection.end();

    return result as workspaceUsersData[];
  }

  async getWorkspaceUserById(
    workspaceId: number,
    userId: number
  ): Promise<workspaceUsersData> {
    const connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<UserBBDD[]>(
      `
			SELECT
				'id',
				u.id,
				'username',
				u.username,
				'email',
				u.email,
				'createdAt',
				u.createdAt,
				'role',
				uw.role,
				'idUserWorkspace',
				uw.id

			FROM
				user u
			INNER JOIN
				userWorkspace uw
			ON
				u.id = uw.idUser
			WHERE
				uw.idWorkspace = ? AND uw.idUser = ? AND uw.deleted = 0
			`,
      [workspaceId, userId]
    );

    await connection.end();

    return result[0] as workspaceUsersData;
  }

}

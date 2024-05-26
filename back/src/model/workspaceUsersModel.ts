import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { UserWorkspace, User, userWorkspaceData, Role } from "@types";
import { dbconfig } from "@/lib/mysqldb";

interface UserBBDD extends RowDataPacket {
	id: number;
	idWorkspace: number;
	role: Role;
	user: string;
}

export class WorkspaceUsersModel {

  async getWorkspaceUsers(idWorkspace: number): Promise<userWorkspaceData[]> {
    const connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<UserBBDD[]>(
      `
			SELECT
				uw.id,
				uw.idWorkspace,
				uw.role,
				(
					SELECT
						JSON_OBJECT(
							'id', u.id,
							'username', u.username,
							'email', u.email
						)
					FROM
						user u
					WHERE
						u.id = uw.idUser
				) as 'user'
			FROM
				userWorkspace uw
			WHERE
				uw.idWorkspace = ? AND uw.deleted = 0

			`,
      [idWorkspace]
    );

    await connection.end();

    const usersWorkspace: userWorkspaceData[] = result.map((userWorkspace) => {
      return {
				id: userWorkspace.id,
				idWorkspace: userWorkspace.idWorkspace,
				role: userWorkspace.role as Role,
				user: JSON.parse(userWorkspace.user),
      };
    });

    return usersWorkspace;
  }

  async getWorkspaceUserByidUser(
    idWorkspace: number,
    idUser: number
  ): Promise<userWorkspaceData> {
    const connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<UserBBDD[]>(
      `
			SELECT
				uw.id,
				uw.idWorkspace,
				uw.role,
				(
					SELECT
						JSON_OBJECT(
							'id', u.id,
							'username', u.username,
							'email', u.email
						)
					FROM
						user u
					WHERE
						u.id = uw.idUser
				) as 'user'
			FROM
				userWorkspace uw
			WHERE
				uw.idWorkspace = ? AND uw.idUser = ? AND uw.deleted = 0
			`,
      [idWorkspace, idUser]
    );

    await connection.end();

		const userWorkspace: userWorkspaceData = {
			id: result[0].id,
			idWorkspace: result[0].idWorkspace,
			role: result[0].role as Role,
			user: JSON.parse(result[0].user),
		};

		return userWorkspace;

  }

  async deleteWorkspaceUser(idUserWorkspace: number) {
    const connection = await mysql.createConnection(dbconfig);

    await connection.query(
      `
			UPDATE
				userWorkspace
			SET
				deleted = 1
			WHERE
				id = ?
			`,
      [idUserWorkspace]
    );

    await connection.end();
  }
}

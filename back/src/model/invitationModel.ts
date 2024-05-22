import mysql, {
  Connection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import { UserModel } from "./userModel";

import { dbconfig } from "@/lib/mysqldb";
import { Invitation } from "@/interfaces/interfaces";

interface InvitationBBDD extends RowDataPacket {
  id: number;
  email: string;
  idWorkspace: number;
}

const userModel = new UserModel();

export class InvitationModel {
  constructor() {}

  async getInvitationsByIdUser(idUser: number) {
    const connection: Connection = await mysql.createConnection(dbconfig);

    interface userMail extends RowDataPacket {
      email: string;
    }
    const [userMail] = await connection.query<userMail[]>(
      `
			SELECT email
			FROM user
			WHERE id = ?
			`,
      [idUser]
    );

    const [result] = await connection.query<RowDataPacket[]>(
      `
    	SELECT *
    	FROM invitation
    	WHERE email = ?
    	`,
      [userMail[0].email]
    );

    await connection.end();

    return result;
  }

  async getInvitationsById(idInvitation: number) {
    const connection: Connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<RowDataPacket[]>(
      `
			SELECT *
			FROM invitation
			WHERE id = ?
			`,
      [idInvitation]
    );

    await connection.end();

    return result;
  }

  async postInvitation(invitation: Invitation): Promise<number> {
    const connection: Connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<ResultSetHeader>(
      `
			INSERT INTO invitation (email, idWorkspace)
			VALUES (?, ?)
			`,
      [invitation.email, invitation.idWorkspace]
    );

    await connection.end();

    return result.insertId;
  }

  async deleteInvitation(id: number): Promise<void> {
    const connection: Connection = await mysql.createConnection(dbconfig);

    await connection.query(
      `
			DELETE FROM invitation
			WHERE id = ?
			`,
      [id]
    );

    await connection.end();
  }

  async acceptInvitation(id: number): Promise<void> {
    const connection: Connection = await mysql.createConnection(dbconfig);

    const [invitation] = await connection.query<InvitationBBDD[]>(
      `
			SELECT *
			FROM invitation
			WHERE id = ?
			`,
      [id]
    );

    await connection.query(
      `
			DELETE FROM invitation
			WHERE id = ?
			`,
      [id]
    );

    const user = await userModel.getUserByEmail(invitation[0].email);
    if (!user) {
      await connection.end();
      return;
    }

    await connection.query(
      `
			INSERT INTO userWorkspace (idUser, idWorkspace, role, deleted)
			VALUES (?, ?, ?, ?)
			`,
      [user.id, invitation[0].idWorkspace, "GUEST", 0]
    );

    await connection.end();
  }

  async rejectInvitation(id: number): Promise<void> {
    const connection: Connection = await mysql.createConnection(dbconfig);

    await connection.query(
      `
			DELETE FROM invitation
			WHERE id = ?
			`,
      [id]
    );

    await connection.end();
  }
}

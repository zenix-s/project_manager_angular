import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { dbconfig } from "@/lib/mysqldb";
import { User } from "@types";
interface UserDataBBDD extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class UserModel {
  async getUserById(id: number): Promise<User | null> {
    const connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<UserDataBBDD[]>(
      `
			SELECT
				id,
				username,
				email,
				password,
				createdAt
			FROM
				user
			WHERE
				id = ?
			`,
      [id]
    );

    await connection.end();

    if (result.length === 0) {
      return null;
    }

    return {
      id: result[0].id,
      username: result[0].username,
      email: result[0].email,
      password: result[0].password,
      createdAt: result[0].createdAt,
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<UserDataBBDD[]>(
      `
			SELECT
				id,
				username,
				email,
				password,
				createdAt
			FROM
				user
			WHERE
				email = ?
			`,
      [email]
    );

    await connection.end();

    if (result.length === 0) {
      return null;
    }

    return {
      id: result[0].id,
      username: result[0].username,
      email: result[0].email,
      password: result[0].password,
      createdAt: result[0].createdAt,
    };
  }

	async getUserByUsername(username: string): Promise<User | null> {
		const connection = await mysql.createConnection(dbconfig);

		const [result] = await connection.query<UserDataBBDD[]>(
			`
			SELECT
				id,
				username,
				email,
				password,
				createdAt
			FROM
				user
			WHERE
				username = ?
			`,
			[username]
		);

		await connection.end();

		if (result.length === 0) {
			return null;
		}

		return {
			id: result[0].id,
			username: result[0].username,
			email: result[0].email,
			password: result[0].password,
			createdAt: result[0].createdAt,
		};
	}

  async login(username: string, password: string) {
    const connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<UserDataBBDD[]>(
      `
			SELECT
				id,
				username,
				email,
				password,
				createdAt
			FROM
				user
			WHERE
				username = ? AND password = ?
			`,
      [username, password]
    );

    await connection.end();

    if (result.length === 0) {
      return null;
    }

    return {
      id: result[0].id,
      username: result[0].username,
      email: result[0].email,
    };
  }

	async createUser(username: string, email: string, password: string): Promise<number> {
		const connection = await mysql.createConnection(dbconfig);

		const [result] = await connection.query<ResultSetHeader>(
			`
			INSERT INTO user (username, email, password, createdAt)
			VALUES (?, ?, ?, ?)
			`,
			[username, email, password, new Date()]
		);

		await connection.end();

		return result.insertId;
	}
}

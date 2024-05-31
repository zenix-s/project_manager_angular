import mysql, {
  Connection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import { Category } from "@types";

import { dbconfig } from "@/lib/mysqldb";

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

  async getCategoriesByIdWorkspace(
    idWorkspace: number
  ): Promise<CategoryBBDD[]> {
    const connection: Connection = await mysql.createConnection(dbconfig);

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
          c.idWorkspace = ? &&
					c.deleted = 0

       `,
      [idWorkspace]
    );

    await connection.end();

    return result;
  }

  async getCategoryById(idCategory: number): Promise<Category> {
    const connection: Connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<CategoryBBDD[]>(
      `
				SELECT
					c.id,
					c.name,
					c.description,
					c.color,
					c.completed,
					c.idWorkspace
				FROM
					category c
				WHERE
					c.id = ? && c.deleted = 0
			`,
      [idCategory]
    );

    await connection.end();

    return {
      id: result[0].id,
      name: result[0].name,
      description: result[0].description,
      color: result[0].color,
      completed: result[0].completed,
      idWorkspace: result[0].idWorkspace,
      deleted: false,
    };
  }

  async addCategory(category: Category): Promise<number> {
    const connection: Connection = await mysql.createConnection(dbconfig);

    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO category (name, description, color, completed, idWorkspace) VALUES (?, ?, ?, ?, ?)`,
      [
        category.name,
        category.description,
        category.color,
        category.completed,
        category.idWorkspace,
      ]
    );

    await connection.end();

    return result.insertId;
  }

  async deleteCategory(idCategory: number): Promise<number> {
    const connection: Connection = await mysql.createConnection(dbconfig);

    await connection.query(
      `
				UPDATE category
				SET deleted = 1
				WHERE id = ?
			`,
      [idCategory]
    );

    await connection.end();
    return idCategory;
  }

  async updateCategory(category: Category): Promise<number> {
    const connection: Connection = await mysql.createConnection(dbconfig);

    await connection.query(
      `
				UPDATE category
				SET name = ?, description = ?, color = ?, completed = ?, idWorkspace = ?
				WHERE id = ?

			`,
      [
        category.name,
        category.description,
        category.color,
        category.completed,
        category.idWorkspace,
        category.id,
      ]
    );

    await connection.end();

    return category.id;
  }
}

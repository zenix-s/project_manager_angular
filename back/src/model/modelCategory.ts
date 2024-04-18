import mysql, { Connection, RowDataPacket } from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "rootpassdev",
  database: "tfgsff_db",
};

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
    idWorkspace: number,
  ): Promise<CategoryBBDD[]> {
    const connection: Connection = await mysql.createConnection(config);

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
          c.idWorkspace = ?
       `,
      [idWorkspace],
    );

    await connection.end();

    return result;
  }
}

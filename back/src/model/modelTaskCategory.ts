import { dbconfig } from "@/lib/mysqldb";
import mysql, {
  Connection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

import { TaskCategory } from "@types";

interface TaskCategoryBBDD extends RowDataPacket {
	id: number;
	idTask: number;
	idCategory: number;
}

export class ModelTaskCategory{
	async postTaskCategory(taskCategory: TaskCategory): Promise<number> {
		const connection: Connection = await mysql.createConnection(dbconfig);

		const [result] = await connection.query<ResultSetHeader>(
			`
			INSERT INTO taskCategory
			(idTask, idCategory)
			VALUES
			(?, ?)
			`,
			[taskCategory.idTask, taskCategory.idCategory]
		);

		await connection.end();

		return result.insertId;
	}

	async deleteTaskCategory(taskCategory:TaskCategory) {
		const connection: Connection = await mysql.createConnection(dbconfig);

		await connection.query(
			`
			DELETE FROM taskCategory
			WHERE idTask = ? AND idCategory = ?
			`,
			[taskCategory.idTask, taskCategory.idCategory]
		);

		await connection.end();
	}
} 
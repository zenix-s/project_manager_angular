import { createPool } from "mysql2/promise";

process.loadEnvFile();

export const pool = createPool({
	host: "localhost",
	user: "root",
	password: "rootpassdev",
	database: "tfgsff_db",
	port: 3306,
});
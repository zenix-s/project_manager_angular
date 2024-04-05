import express, {Express, Request, Response} from "express";
import tasksRouter from '@/routes/routerTasks'
import WorkspaceRouter from '@/routes/routerWorkspace'
import mysql from 'mysql2/promise';


process.loadEnvFile();
const app: Express = express();



async function main() {
	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rootpassdev",
		database: "tfgsff_db",
	});

	try {
		const [rows, fields] = await connection.query("SELECT * FROM workspace");
		console.log(rows);
		console.log(fields);
	} catch (error) {
		console.error("Error connecting to database: ", error);
	}
}

main();

// app.use('/tasks', tasksRouter);
// app.use('/workspace', WorkspaceRouter);


// app.listen(5000, () => console.log("Server running on port 5000"));


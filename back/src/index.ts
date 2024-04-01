import express, {Express, Request, Response} from "express";
import tasksRouter from '@/routes/routerTasks'

process.loadEnvFile();
const app: Express = express();



app.use('/tasks', tasksRouter);


app.listen(5000, () => console.log("Server running on port 5000"));


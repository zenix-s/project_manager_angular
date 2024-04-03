import express, {Express, Request, Response} from "express";
import tasksRouter from '@/routes/routerTasks'
import WorkspaceRouter from '@/routes/routerWorkspace'

process.loadEnvFile();
const app: Express = express();



app.use('/tasks', tasksRouter);
app.use('/workspace', WorkspaceRouter);


app.listen(5000, () => console.log("Server running on port 5000"));


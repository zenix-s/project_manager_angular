import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import mysql, { RowDataPacket } from "mysql2/promise";
import { CategoryController } from "./controller/workspace/category/categoryController";
import { WorkspaceController } from "./controller/workspace/workspaceController";
import { TaskController } from "@/controller/workspace/task/taskController";

process.loadEnvFile();
const app: Express = express();
const port = process.env.PORT || 5000;

const workspaceController = new WorkspaceController();
const controllerTasks = new TaskController();
const controllerCategory = new CategoryController();

// Middleware
app.use(bodyParser.json());

// Routers
// app.use("/userWorkspaces", UserWorkspacesRouter);
app.get("/userWorkspaces", workspaceController.getWorkspacesByIdUserController);
// app.delete("/userWorkspaces/:id", userWorkspacesController.deleteUserWorkspacesController);
// app.put("/userWorkspaces/:id", userWorkspacesController.putUserWorkspacesController);

// // workspace
app.delete("/workspace/:idWorkspace", workspaceController.deleteWorkspace);
// app.post("/workspace", workspaceController.postWorkspacesController);
// // workspace/task
app.get("/workspace/:idWorkspace/task", controllerTasks.getWorkspaceTasks);
app.post("/workspace/:idWorkspace/task", controllerTasks.postTaskController);

// // workspace/category
app.get(
  "/workspace/:idWorkspace/categories",
  controllerCategory.getCategoriesByWorkspaceId,
);

// // task
app.delete("/task/:idTask", controllerTasks.deleteTask);
app.put("/task/:idTask", controllerTasks.putTask);

// app.get("/", async (req: Request, res: Response) => {
  
// });

app.listen(port, () => console.log("Server running on port " + port));

import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import mysql, { RowDataPacket } from "mysql2/promise";
import { CategoryController } from "./controller/workspace/category/categoryController";
import { WorkspaceController } from "./controller/workspace/workspaceController";
import { TaskController } from "@/controller/workspace/task/taskController";

import http from "node:http";

process.loadEnvFile();
const app: Express = express();
const port = process.env.PORT || 5000;

const workspaceController = new WorkspaceController();
const controllerTasks = new TaskController();
const controllerCategory = new CategoryController();

// Middleware
app.use(bodyParser.json());

// Routers
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
  controllerCategory.getCategoriesByWorkspaceId
);
app.post("/workspace/:idWorkspace/categories", controllerCategory.postCategory);

// Workspace
app.post("/workspace", workspaceController.postWorkspace);

// // task
app.delete("/task/:idTask", controllerTasks.deleteTask);
app.put("/task/:idTask", controllerTasks.putTask);

// category
app.delete("/category/:idCategory", controllerCategory.deleteCategory);

// });

app.listen(port, () => console.log("Server running on port " + port));

// simula los endpoints del anterior servidor
// http.createServer((req, res) => {
//   const { headers, method, url } = req;
// 	if (url === "/userWorkspaces") {
// 		switch (method) {
// 			case "GET":
// 				// get userWorkspaces
// 				break;
// 			case "POST":
// 				// post userWorkspaces
// 				break;
// 			case "DELETE":
// 				// delete userWorkspaces
// 				break;
// 			case "PUT":
// 				// put userWorkspaces
// 				break;
// 		}
// 	}
// });

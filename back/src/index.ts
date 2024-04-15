import express, { Express } from "express";
import bodyParser from "body-parser";
import {
  getWorkspaceTasksController,
  deleteTaskController,
	postTaskController
} from "@/controller/workspace/task/controllerTasks";
import {
  deleteUserWorkspacesController,
  getUserWorkspacesController,
  putUserWorkspacesController,
} from "./controller/userWorkspaces/controllerUserWorkspaces";
import {
  deleteWorkspaceController,
  postWorkspacesController,
} from "./controller/workspace/controllerWorkspace";
import { getWorkspaceCategoryController } from "./controller/workspace/category/controllerCategory";

process.loadEnvFile();
const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routers
// app.use("/userWorkspaces", UserWorkspacesRouter);
app.get("/userWorkspaces", getUserWorkspacesController);
app.delete("/userWorkspaces/:id", deleteUserWorkspacesController);
app.put("/userWorkspaces/:id", putUserWorkspacesController);

// workspace
app.delete("/workspace/:idWorkspace", deleteWorkspaceController);
app.post("/workspace", postWorkspacesController);
// workspace/task
app.get("/workspace/:idWorkspace/task", getWorkspaceTasksController);
app.post("/workspace/:idWorkspace/task", postTaskController);

// workspace/category
app.get("/workspace/:idWorkspace/category", getWorkspaceCategoryController);

// task
app.delete("/task/:idTask", deleteTaskController);

app.listen(port, () => console.log("Server running on port " + port));

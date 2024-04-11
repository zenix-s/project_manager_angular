import express, { Express } from "express";
import bodyParser from "body-parser";
import { getWorkspaceTasksController } from "@/controller/workspace/task/controllerTasks";
import {
  deleteUserWorkspacesController,
  getUserWorkspacesController,
  putUserWorkspacesController,
} from "./controller/userWorkspaces/controllerUserWorkspaces";
import {
  deleteWorkspaceController,
  postWorkspacesController,
} from "./controller/workspace/controllerWorkspace";

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

// app.use("/workspace/:idWorkspace", WorkspaceRouter);
app.delete("/workspace/:idWorkspace", deleteWorkspaceController);
app.get("/workspace/:idWorkspace/task", getWorkspaceTasksController);
app.post("/workspace", postWorkspacesController);

app.listen(port, () => console.log("Server running on port " + port));

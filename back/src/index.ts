import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import WorkspaceRouter from "@/router/workspace/routerWorkspace";
import UserWorkspacesRouter from "@/router/userWorkspaces/routerUserWorkspaces";
import { Workspace } from './interfaces/interfaces';

process.loadEnvFile();
const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routers
app.use("/userWorkspaces", UserWorkspacesRouter);
app.use("/workspace/:idWorkspace", WorkspaceRouter);


app.listen(port, () => console.log("Server running on port " + port));

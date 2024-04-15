import express, { Request, Response, Express } from "express";
import bodyParser from "body-parser";
import {
  getWorkspaceTasksController,
  deleteTaskController,
  postTaskController,
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

import { PrismaClient } from "@prisma/client";
import { Category, TaskData } from "./interfaces/interfaces";
import { categories } from "./assets/data/api/data";

const prisma = new PrismaClient();

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

// app.get("/", async (req: Request, res: Response) => {
//   const workspaceId = 1;

//   try {
//     const tasks = await prisma.task.findMany({
//       where: {
//         idWorkspace: workspaceId,
//       },
//       include: {
//         // Select the category directly instead of including taskCategory
//         taskCategory: {
//           select: {
//             category: true,
//           },
//         },
//         // teamTask: {
//         //   : {
//         //     team: true,
//         //   },
//         // },
//         // userTask: {
//         //   include: {
//         //     user: true,
//         //   },
//         // },
//       },
//     });
//     res.json(tasks as TaskData[]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });

app.listen(port, () => console.log("Server running on port " + port));

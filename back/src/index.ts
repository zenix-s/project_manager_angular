import express, { Request, Response, Express } from "express";
import bodyParser from "body-parser";
import { ControllerTasks } from "@/controller/workspace/task/controllerTasks";
import { WorkspaceController } from "./controller/workspace/controllerWorkspace";
import mysql, { RowDataPacket } from "mysql2/promise";

process.loadEnvFile();
const app: Express = express();
const port = process.env.PORT || 5000;

const workspaceController = new WorkspaceController();
const controllerTasks = new ControllerTasks();

// Middleware
app.use(bodyParser.json());

// Routers
// app.use("/userWorkspaces", UserWorkspacesRouter);
app.get("/userWorkspaces", workspaceController.getWorkspacesByIdUserController);
// app.delete("/userWorkspaces/:id", userWorkspacesController.deleteUserWorkspacesController);
// app.put("/userWorkspaces/:id", userWorkspacesController.putUserWorkspacesController);

// // workspace
// app.delete(
//   "/workspace/:idWorkspace",
//   workspaceController.deleteWorkspaceController
// );
// app.post("/workspace", workspaceController.postWorkspacesController);
// // workspace/task
app.get(
  "/workspace/:idWorkspace/task",
  controllerTasks.getWorkspaceTasksController
);
// app.post("/workspace/:idWorkspace/task", controllerTasks.postTaskController);

// // workspace/category
// app.get("/workspace/:idWorkspace/category", getWorkspaceCategoryController);

// // task
// app.delete("/task/:idTask", controllerTasks.deleteTaskController);

app.get("/", async (req: Request, res: Response) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpassdev",
    database: "tfgsff_db",
  });

	interface TaskDataBBDD extends RowDataPacket {
		taskId: number;
		taskName: string;
		categories: string;
	}

  const [result] = await connection.query<TaskDataBBDD[]>(
    `
		SELECT 
    t.id AS taskId,
    t.name AS taskName,
    CONCAT(
        '[',
        GROUP_CONCAT(
            JSON_OBJECT(
                'id', c.id,
                'name', c.name,
								'color', c.color,
								'completed', c.completed
            )
            ORDER BY c.id
        ),
        ']'
    ) AS categories
FROM 
    task t
LEFT JOIN 
    taskCategory tc ON t.id = tc.idTask
LEFT JOIN 
    category c ON tc.idCategory = c.id
GROUP BY 
    t.id, t.name;
		`
  );

  await connection.end();

	const resultParsed = result.map((task: any) => {
		return {
			id: task.taskId,
			name: task.taskName,
			categories: JSON.parse(task.categories)
		}
	});



  res.json(resultParsed);
});

app.listen(port, () => console.log("Server running on port " + port));

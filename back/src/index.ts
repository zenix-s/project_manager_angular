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
  "/workspace/:idWorkspace/category",
  controllerCategory.getCategoriesByWorkspaceId,
);

// // task
app.delete("/task/:idTask", controllerTasks.deleteTask);

app.get("/", async (req: Request, res: Response) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpassdev",
    database: "tfgsff_db",
  });

  interface CategoryDataBBDD extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    color: string;
    completed: boolean;
    idWorkspace: number;
  }

  interface arr extends RowDataPacket {
    id: number;
    name: string;
    createdAt: string;
    idWorkspace: number;
    description: string;
    completed: number;
    deadline: string;
    priority: string;
    visibility: string;
    dependentIdTask: any;
    categories: string;
    dependents: string;
  }
  const [result] = await connection.query<arr[]>(
    `
    SELECT
	t.id,
	t.name,
	t.createdAt,
	t.idWorkspace,
	t.description,
	t.completed,
	t.deadline,
	t.priority,
	t.visibility,
	t.dependentIdTask,
	CASE
		WHEN COUNT(c.id) > 0 THEN JSON_ARRAYAGG (
			JSON_OBJECT (
				'id',
				c.id,
				'name',
				c.name,
				'description',
				c.description,
				'color',
				c.color,
				'completed',
				c.completed,
				'idWorkspace',
				c.idWorkspace
			)
		)
		ELSE JSON_ARRAY ()
	END AS categories,
	CASE
		WHEN COUNT(t2.id) > 0 THEN JSON_ARRAYAGG (
			JSON_OBJECT (
				'id',
				t2.id,
				'name',
				t2.name,
				'description',
				t2.description,
				'createdAt',
				t2.createdAt,
				'completed',
				t2.completed,
				'deadline',
				t2.deadline,
				'priority',
				t2.priority,
				'visibility',
				t2.visibility,
				'dependentIdTask',
				t2.dependentIdTask,
				'categories',
				(
					SELECT
						JSON_ARRAYAGG (
							JSON_OBJECT (
								'id',
								c.id,
								'name',
								c.name,
								'description',
								c.description,
								'color',
								c.color,
								'completed',
								c.completed,
								'idWorkspace',
								c.idWorkspace
							)
						)
					FROM
						taskCategory tc
						LEFT JOIN category c ON tc.idCategory = c.id
					WHERE
						tc.idTask = t2.id
				),
				'dependents',
				(
					SELECT
						JSON_ARRAYAGG (
							JSON_OBJECT (
								'id',
								t3.id,
								'name',
								t3.name,
								'description',
								t3.description,
								'createdAt',
								t3.createdAt,
								'completed',
								t3.completed,
								'deadline',
								t3.deadline,
								'priority',
								t3.priority,
								'visibility',
								t3.visibility,
								'dependentIdTask',
								t3.dependentIdTask,
								'categories',
								(
									SELECT
										JSON_ARRAYAGG (
											JSON_OBJECT (
												'id',
												c.id,
												'name',
												c.name,
												'description',
												c.description,
												'color',
												c.color,
												'completed',
												c.completed,
												'idWorkspace',
												c.idWorkspace
											)
										)
									FROM
										taskCategory tc
										LEFT JOIN category c ON tc.idCategory = c.id
									WHERE
										tc.idTask = t3.id
								)
							)
						)
					FROM
						task t3
					WHERE
						t3.dependentIdTask = t2.id
				)
			)
		)
		ELSE JSON_ARRAY ()
	END AS dependents
    FROM
	task t
	LEFT JOIN taskCategory tc ON t.id = tc.idTask
	LEFT JOIN category c ON tc.idCategory = c.id
	LEFT JOIN task t2 ON t2.dependentIdTask = t.id
    WHERE
  t.idWorkspace = ?
	AND t.deleted = 0
	AND t.dependentIdTask IS NULL
    GROUP BY
	t.id,
	t.name;
     `,
    [1],
  );

  const formattedResult = result.map((task) => {
    return {
      id: task.id,
      name: task.name,
      createdAt: task.createdAt,
      idWorkspace: task.idWorkspace,
      description: task.description,
      completed: task.completed,
      deadline: task.deadline,
      priority: task.priority,
      visibility: task.visibility,
      dependentIdTask: task.dependentIdTask,
      categories: JSON.parse(task.categories),
      dependents: JSON.parse(task.dependents),
    };
  });

  res.send(formattedResult);
});

app.listen(port, () => console.log("Server running on port " + port));

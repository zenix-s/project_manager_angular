import { Request, Response } from "express";
import { Task, TaskData } from "@types";
import { ModelTask } from "@/model/taskModel";

const modelTask = new ModelTask();

export class TaskController {
  private idWorkspace: number;

  // private modelTask: ModelTask;

  constructor() {
    this.idWorkspace = 1;
    // this.modelTask = new ModelTask();
  }

  public async getWorkspaceTasks(req: Request, res: Response) {
    const workspaceId = parseInt(req.params.idWorkspace);

    try {
      const tasks = await modelTask.getTasksByIdWorkspace(workspaceId);
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  public async deleteTask(req: Request, res: Response) {
    const taskId = parseInt(req.params.idTask);
    const task = await modelTask.getTaskDataById(taskId);
    if (task === undefined) {
      res.status(404).send("Task not found");
      return;
    }
    const deletedId: number = await modelTask.deleteTaskById(taskId);
    res.json(deletedId);
  }

  public async postTaskController(req: Request, res: Response) {
    const workspaceId = parseInt(req.params.idWorkspace);
    const task: Task = req.body;
    task.idWorkspace = workspaceId;
    task.completed = false;

    try {
      const idTask: number = await modelTask.addTask(task);
      const newTask: TaskData = await modelTask.getTaskDataById(idTask);
      res.json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  public async putTask(req: Request, res: Response) {
    const Task: Task = req.body;
    const idTask: number = parseInt(req.params.idTask);

    if (!(await modelTask.taskExists(idTask))) {
      res.status(404).send("Task not found");
      return;
    }

    try {
      await modelTask.updateTask(Task);
      if (Task.dependentIdTask !== null) {
        const updatedTask = await modelTask.getTaskDataById(
          Task.dependentIdTask
        );
        if (updatedTask === undefined) {
          res.status(404).send("Task not found");
          return;
        }
        res.json(updatedTask);
      } else {
        const updatedTask = await modelTask.getTaskDataById(idTask);
				if (updatedTask === undefined) {
					res.status(404).send("Task not found");
					return;
				}
				res.json(updatedTask);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}

// // /workspace/:idWorkspace/task
// export async function getWorkspaceTasksController(req: Request, res: Response) {
//   const workspaceId = parseInt(req.params.idWorkspace);

// 	try {
// 		const tasks = await getTasks(workspaceId);
// 		res.json(tasks);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).send("Internal server error");
// 	}

//   // const tasks = getTasks(workspaceId);
//   // res.send(tasks);
// }

// // /task/:idTask
// export function deleteTaskController(req: Request, res: Response) {
//   const taskId = parseInt(req.params.idTask);
//   const task = getTaskById(taskId);
//   if (task === undefined) {
//     res.status(404).send("Task not found");
//     return;
//   }
//   deleteTaskById(taskId);
//   res.json({
//     message: "Task deleted",
//     task,
//   });
// }

// // /workspace/:idWorkspace/task
// export async function postTaskController(req: Request, res: Response) {
//   const workspaceId = parseInt(req.params.idWorkspace);
//   const task: Task = req.body;
//   task.idWorkspace = workspaceId;

//   try {
//     const newTask = await addTask(task);

//     res.json(newTask);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// }

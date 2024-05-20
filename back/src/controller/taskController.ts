import { Request, Response } from "express";
import { Task, TaskData } from "@types";
import { ModelTask } from "@/model/taskModel";
import { WorkspaceModel } from "@/model/workspaceModel";
import { WorkspaceUsersModel } from "@/model/workspaceUsersModel";
import { checkUserEditPermission } from "@/services/userPermissions";

const modelTask = new ModelTask();
const workspaceModel = new WorkspaceModel();
const workspaceUsersModel = new WorkspaceUsersModel();

export class TaskController {
  public async getWorkspaceTasks(req: Request, res: Response) {
    const workspaceId = parseInt(req.params.idWorkspace);

    // Comprobamos si el workspace existe
    if (!(await workspaceModel.workspaceExists(workspaceId))) {
			res.status(404).json({ message: "Workspace not found" });
      return;
    }

    try {
      const tasks = await modelTask.getTasksByIdWorkspace(workspaceId);
      res.json(tasks);
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error xxx" });
    }
  }

  public async deleteTask(req: Request, res: Response) {
    const taskId = parseInt(req.params.idTask);
    const authToken = req.headers.authorization;

    // Comprobamos si la tarea existe
    const task = await modelTask.getTaskDataById(taskId);
    if (task === undefined) {
			res.status(404).json({ message: "Task not found" });
      return;
    }

    const workspaceUser = await workspaceUsersModel.getWorkspaceUserById(
      task.task.idWorkspace,
      parseInt(authToken as string)
    );

    if (workspaceUser === undefined) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    if (!checkUserEditPermission(workspaceUser.role)) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    try {
      const deletedId: number = await modelTask.deleteTaskById(taskId);
      res.json(deletedId);
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error" });
    }
  }

  public async postTaskController(req: Request, res: Response) {
    const workspaceId = parseInt(req.params.idWorkspace);
    const authToken = req.headers.authorization;
    const task: Task = req.body;
    task.idWorkspace = workspaceId;
    task.completed = false;

    // Comprobamos si el workspace existe
    if (!(await workspaceModel.workspaceExists(workspaceId))) {
			res.status(404).json({ message: "Workspace not found" });
      return;
    }

    // Comprobamos si el usuario tiene permisos para crear tareas
    const workspaceUser = await workspaceUsersModel.getWorkspaceUserById(
      workspaceId,
      parseInt(authToken as string)
    );

    if (workspaceUser === undefined) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    if (!checkUserEditPermission(workspaceUser.role)) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    try {
      const idTask: number = await modelTask.addTask(task);
      const newTask: TaskData = await modelTask.getTaskDataById(idTask);
      res.json(newTask);
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error" });
    }
  }

  public async putTask(req: Request, res: Response) {
    const Task: Task = req.body;
    const idTask: number = parseInt(req.params.idTask);
    const authToken = req.headers.authorization;

    if (!(await modelTask.taskExists(idTask))) {
			res.status(404).json({ message: "Task not found" });
      return;
    }



    // Comprobamos si el usuario tiene permisos para editar tareas
    const workspaceUser = await workspaceUsersModel.getWorkspaceUserById(
      Task.idWorkspace,
      parseInt(authToken as string)
    );

		console.log({
			"idWorkspace": Task.idWorkspace,
			"authToken": parseInt(authToken as string),
			"workspaceUser": workspaceUser,
		});

    if (workspaceUser === undefined) {
			res.status(403).json({ message: "Unauthorized 1" });
      return;
    }

    if (!checkUserEditPermission(workspaceUser.role)) {
			res.status(403).json({ message: "Unauthorized 2" });
      return;
    }

    try {
      await modelTask.updateTask(Task);
      if (Task.dependentIdTask !== null) {
        const updatedTask = await modelTask.getTaskDataById(
          Task.dependentIdTask
        );
        if (updatedTask === undefined) {
					res.status(404).json({ message: "Task not found" });
          return;
        }
        res.json(updatedTask);
      } else {
        const updatedTask = await modelTask.getTaskDataById(idTask);
        if (updatedTask === undefined) {
					res.status(404).json({ message: "Task not found" });
          return;
        }
        res.json(updatedTask);
      }
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error" });
    }
  }
}

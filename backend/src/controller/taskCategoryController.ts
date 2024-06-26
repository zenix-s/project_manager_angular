import { Request, Response } from "express";

import { TaskCategory } from "@types";

import { ModelTaskCategory } from "@/model/taskCategoryModel";
import { ModelCategory } from "@/model/categoryModel";
import { ModelTask } from "@/model/taskModel";
import { WorkspaceUsersModel } from "@/model/workspaceUsersModel";
import { checkUserEditPermission } from "@/services/userPermissions";

const modelTaskCategory = new ModelTaskCategory();
const modelCategory = new ModelCategory();
const modelTask = new ModelTask();
const modelWorkspaceUsers = new WorkspaceUsersModel();

export class TaskCategoryController {
  public async postTaskCategory(req: Request, res: Response) {
    if (!req.body) {
			res.status(400).json({ message: "Bad request" });
      return;
    }

    const authToken = req.headers.authorization;
    const taskCategory: TaskCategory = req.body;

    // Comprobamos si body tiene los campos necesarios
    if (!taskCategory.idCategory || !taskCategory.idTask) {
			res.status(400).json({ message: "Bad request" });
      return;
    }

    // Comprobamos si la tarea y la categoria existen
    const category = await modelCategory.getCategoryById(
      taskCategory.idCategory
    );
    const task = await modelTask.getTaskDataById(taskCategory.idTask);
    if (!category || !task) {
			res.status(404).json({ message: "Category or Task not found" });
      return;
    }

    // Comprobamos si la categoria y la tarea pertenecen al mismo workspace
    if (category.idWorkspace !== task.task.idWorkspace) {
			res.status(400).json({ message: "Category and Task are not in the same workspace" });
      return;
    }

    // Comprobamos si el usuario tiene permisos para editar la tarea
    const workspaceUser = await modelWorkspaceUsers.getWorkspaceUserByidUser(
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
      const idTaskCategory: number = await modelTaskCategory.postTaskCategory(
        taskCategory
      );
      res.status(201).json({
        id: idTaskCategory,
        message: "TaskCategory created",
      });
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteTaskCategory(req: Request, res: Response) {
    const idTask: number = parseInt(req.params.idTask);
    const idCategory: number = parseInt(req.params.idCategory);
    const authToken = req.headers.authorization;

    if (!idCategory || !idTask) {
			res.status(400).json({ message: "Bad request" });
      return;
    }

    const category = await modelCategory.getCategoryById(idCategory);
    const task = await modelTask.getTaskDataById(idTask);

    if (!category || !task) {
			res.status(404).json({ message: "Category or Task not found" });
      return;
    }

    if (category.idWorkspace !== task.task.idWorkspace) {
			res.status(400).json({ message: "Category and Task are not in the same workspace" });
      return;
    }

    const taskCategory: TaskCategory = {
      id: 0,
      idTask,
      idCategory,
    };

    const workspaceUser = await modelWorkspaceUsers.getWorkspaceUserByidUser(
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
      await modelTaskCategory.deleteTaskCategory(taskCategory);
      res.json(idTask);
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error" });
    }
  }
}

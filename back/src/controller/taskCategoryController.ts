import { Request, Response } from "express";

import { TaskCategory } from "@types";

import { ModelTaskCategory } from "@/model/modelTaskCategory";
import { ModelCategory } from "@/model/modelCategory";
import { ModelTask } from "@/model/modelTask";

const modelTaskCategory = new ModelTaskCategory();
const modelCategory = new ModelCategory();
const modelTask = new ModelTask();

export class TaskCategoryController {
  public async postTaskCategory(req: Request, res: Response) {
    // try {
    // 	const taskCategory: TaskCategory = req.body;
    // } catch (error) {
    // 	console.error(error);
    // 	res.status(400).send("Bad request");
    // 	return;
    // }

    if (!req.body) {
      res.status(400).send("Bad request");
      return;
    }

    const taskCategory: TaskCategory = req.body;

    if (!taskCategory.idCategory || !taskCategory.idTask) {
      res.status(400).send("Bad request");
      return;
    }

    const category = await modelCategory.getCategoryById(
      taskCategory.idCategory
    );
    const task = await modelTask.getTaskDataById(taskCategory.idTask);

    if (!category || !task) {
      res.status(404).send("Category or Task not found");
      return;
    }
		
    if (category.idWorkspace !== task.task.idWorkspace) {
      res.status(400).send("Category and Task are not in the same workspace");
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
      res.status(500).send("Internal server error");
    }
  }
}
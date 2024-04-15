import { Request, Response } from "express";
import { getTasks } from "@/services/workspace/tasks/getTasks";
import { getTaskById } from "@/services/workspace/tasks/getTaskById";
import deleteTaskById from "@/services/workspace/tasks/deleteTaskById";
import { addTask } from "@/services/workspace/tasks/addTask";
import { Task } from "@types";

// /workspace/:idWorkspace/task
export function getWorkspaceTasksController(req: Request, res: Response) {
  const workspaceId = parseInt(req.params.idWorkspace);
  const tasks = getTasks(workspaceId);
  res.send(tasks);
}

// /task/:idTask
export function deleteTaskController(req: Request, res: Response) {
	const taskId = parseInt(req.params.idTask);
	const task = getTaskById(taskId);
	if (task === undefined) {
		res.status(404).send("Task not found");
		return;
	}
	deleteTaskById(taskId);
	res.json({
		message: "Task deleted",
		task,
	})
}

// /workspace/:idWorkspace/task
export function postTaskController(req: Request, res: Response) {
	const workspaceId = parseInt(req.params.idWorkspace);
	const task:Task = req.body;
	task.idWorkspace = workspaceId;
	task.createdAt = new Date();
	task.completed = false;

	const newTask = addTask(task);
	res.json(newTask);
}
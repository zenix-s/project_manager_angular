import { Request, Response } from "express";
import { getTasks } from "@/services/workspace/tasks/getTasks";
import { getTaskById } from "@/services/workspace/tasks/getTaskById";

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
	res.json({
		message: "Task deleted",
		task,
	})
}
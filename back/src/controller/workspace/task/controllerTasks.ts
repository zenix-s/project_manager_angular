import { Request, Response } from "express";
import { getTasks } from "@/services/workspace/tasks/getTasks";
export function getWorkspaceTasksController(req: Request, res: Response) {
  console.log(req.params.idWorkspace);
  const workspaceId = parseInt(req.params.idWorkspace);
  console.log("workspaceId", workspaceId);
  const tasks = getTasks(workspaceId);
  res.send(tasks);
}


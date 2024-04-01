import { Request, Response } from "express";
import { getTasks } from "@/services/tasks/getTasks";


export function listTasks(req: Request, res: Response) {
	res.send(getTasks(parseInt(req.params.projectId)));
}
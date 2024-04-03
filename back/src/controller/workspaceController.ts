import { Request, Response } from "express";
import getUserWorkspaces from "@/services/workspace/getUserWorkspaces";

export function listWorkspaces(req: Request, res: Response) {
	const userId = parseInt(req.params.userId);
	const workspaces = getUserWorkspaces(userId);
	res.send(workspaces);
}
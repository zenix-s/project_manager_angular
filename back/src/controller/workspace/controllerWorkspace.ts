import { Request, Response } from "express";
import deleteWorkspace from "@/services/workspace/deleteWorkspace";

// /workspace/:idWorkspace

export function deleteWorkspaceController(req: Request, res: Response) {
	const idWorkspace:number = parseInt(req.params.idWorkspace);
  const deleted:boolean = deleteWorkspace(idWorkspace)
	res.json(
		{
			"deleted":deleted,
			"message":"workspace eliminado"
		}
	);
}

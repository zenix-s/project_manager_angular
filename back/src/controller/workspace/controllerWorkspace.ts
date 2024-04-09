import { Request, Response } from 'express';
export function deleteWorkspaceController(req: Request, res: Response) {
		res.send("Eliminar workspace");
}
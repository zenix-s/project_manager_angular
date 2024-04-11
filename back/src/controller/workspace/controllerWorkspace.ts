import { Request, Response } from "express";
import deleteWorkspace from "@/services/workspace/deleteWorkspace";
import newWorkspace from "@/services/workspace/newWorkspace";
import { Workspace } from "@/interfaces/interfaces";

// /workspace/:idWorkspace

export function postWorkspacesController(req: Request, res: Response) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }
  try {
    const workspace: Workspace = req.body;
    res.status(201).send(newWorkspace(workspace));
  } catch (error) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

export function deleteWorkspaceController(req: Request, res: Response) {
  const idWorkspace: number = parseInt(req.params.idWorkspace);
  const deleted: boolean = deleteWorkspace(idWorkspace);
  res.json({
    deleted: deleted,
    message: "workspace eliminado con id: " + idWorkspace + "",
  });
}

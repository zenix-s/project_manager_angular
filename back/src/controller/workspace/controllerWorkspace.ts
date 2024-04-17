import { Request, Response } from "express";
import { Workspace } from "@/interfaces/interfaces";
import { ModelWorkspace } from "@/model/modelWorkspace";

const modelWorkspace = new ModelWorkspace();

export class WorkspaceController {
  public async getWorkspacesByIdUserController(req: Request, res: Response) {
    try {
      // const idUser: number = parseInt(req.params.idUser);
      const idUser: number = 1;
      res.json(await modelWorkspace.getWorkspacesByIdUser(idUser));
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  // public async postWorkspacesController(req: Request, res: Response) {
  //   if (!req.body) {
  //     res.status(400).send({
  //       message: "Content can not be empty!",
  //     });
  //     return;
  //   }
  //   if (!req.body.name) {
  //     res.status(400).send({
  //       message: "Name can not be empty!",
  //     });
  //     return;
  //   }
  //   try {
  //     const workspace: Workspace = req.body;
  //     res.status(201).send(newWorkspace(workspace));
  //   } catch (error) {
  //     res.status(400).send({
  //       message: "Content can not be empty!",
  //     });
  //   }
  // }

  // public deleteWorkspaceController(req: Request, res: Response) {
  //   const idWorkspace: number = parseInt(req.params.idWorkspace);
  //   const deleted: boolean = deleteWorkspace(idWorkspace);
  //   res.json({
  //     deleted: deleted,
  //     message: "workspace eliminado con id: " + idWorkspace + "",
  //   });
  // }
}

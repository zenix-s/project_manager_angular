import { Request, Response } from "express";
import { Workspace } from "@types";
import { WorkspaceModel } from "@/model/workspaceModel";
import { WorkspaceUsersModel } from "@/model/workspaceUsersModel";
import {
  checkUserAdminPermission,
  checkUserEditPermission,
} from "@/services/userPermissions";

const modelWorkspace = new WorkspaceModel();
const modelWorkspaceUsers = new WorkspaceUsersModel();

export class WorkspaceController {
  public async getWorkspacesByIdUserController(req: Request, res: Response) {
    try {
      const idUser = parseInt(req.headers.authorization as string);
      console.log("idUser", idUser);
      res.json(await modelWorkspace.getWorkspacesByIdUser(idUser));
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  public async deleteWorkspace(req: Request, res: Response) {
    const idWorkspace: number = parseInt(req.params.idWorkspace);
    const authToken = req.headers.authorization;

    const workspaceUser = await modelWorkspaceUsers.getWorkspaceUserById(
      idWorkspace,
      parseInt(authToken as string)
    );

    if (workspaceUser === undefined) {
      res.status(403).send("Unauthorized");
      return;
    }

    if (!checkUserEditPermission(workspaceUser.role)) {
      res.status(403).send("Unauthorized");
      return;
    }

    try {
      const deleted: boolean = await modelWorkspace.deleteWorkspace(
        idWorkspace
      );
      res.json({
        deleted: deleted,
        message: "workspace eliminado con id: " + idWorkspace + "",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  public async postWorkspace(req: Request, res: Response) {
    const workspace: Workspace = req.body;
    const idUser = parseInt(req.headers.authorization as string);

    try {
      const idWorkspace: number = await modelWorkspace.addWorkspace(
        idUser,
        workspace
      );
      if (await modelWorkspace.workspaceExists(idWorkspace)) {
        res.status(201).json({
          id: idWorkspace,
          message: "Workspace created",
        });
      } else {
        res.status(400).json({
          message: "Workspace not created",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  public async getWorkspaceUsers(req: Request, res: Response) {
    // const idWorkspace: number = parseInt(req.params.idWorkspace);
    const idWorkspace: number = 1;

    try {
      const workspaceUsers = await modelWorkspaceUsers.getWorkspaceUsers(
        idWorkspace
      );
      res.json(workspaceUsers);
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
}

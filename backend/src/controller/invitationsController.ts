import { Request, Response } from "express";
import { InvitationModel } from "@/model/invitationModel";
import { UserModel } from "@/model/userModel";
import { checkUserEditPermission } from "@/services/userPermissions";
import { WorkspaceUsersModel } from "../model/workspaceUsersModel";
const modelInvitation = new InvitationModel();
const userModel = new UserModel();
const workspaceUsersModel = new WorkspaceUsersModel();

export class InvitationController {

  public async acceptInvitation(req: Request, res: Response) {
    const idInvitation = parseInt(req.params.id);
    const authToken = req.headers.authorization;
    if (authToken === undefined) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const invitation = await modelInvitation.getInvitationsById(idInvitation);
    const user = await userModel.getUserByEmail(invitation[0].email);

    if (user === undefined || user === null) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.id !== parseInt(authToken)) {
      res.status(403).json({ message: "Unauthorized " + user.id + " " + authToken});
      return;
    }

    try {
      await modelInvitation.acceptInvitation(idInvitation);
      res.status(200).json({ message: "Invitation accepted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async rejectInvitation(req: Request, res: Response) {
    const idInvitation = parseInt(req.params.id);
    const authToken = req.headers.authorization;
    if (authToken === undefined) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const invitation = await modelInvitation.getInvitationsById(idInvitation);
    const user = await userModel.getUserByEmail(invitation[0].email);

    if (user === undefined || user === null) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.id !== parseInt(authToken)) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    try {
      await modelInvitation.rejectInvitation(idInvitation);
      res.status(200).json({ message: "Invitation rejected" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async postInvitation(req: Request, res: Response) {
    const invitation = req.body;
    const authToken = req.headers.authorization;
    if (authToken === undefined) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await userModel.getUserById(parseInt(authToken));
    if (user === undefined || user === null) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const userWorkspace = await workspaceUsersModel.getWorkspaceUserByidUser(
      invitation.idWorkspace,
      user.id
    );

    if (!checkUserEditPermission(userWorkspace.role)) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

		// console.log(user);

    try {
      const idInvitation = await modelInvitation.postInvitation(invitation);
      res.status(201).json({ idInvitation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getInvitationsByIdUser(req: Request, res: Response) {
    // const idUser: number = parseInt(req.params.idUser);
    // const invitations = await modelInvitation.getInvitationsByIdUser(idUser);

    // res.status(200).json(invitations);
		
		const authToken = req.headers.authorization;
		if (authToken === undefined) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const user = await userModel.getUserById(parseInt(authToken));
		if (user === undefined || user === null) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const invitations = await modelInvitation.getInvitationsByIdUser(user.id);

		res.status(200).json(invitations);
  }
}

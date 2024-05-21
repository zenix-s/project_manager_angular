import { Request, Response } from "express";
import { InvitationModel } from "@/model/invitationModel";
import { IconsModule } from '../../../front/src/app/share/icons/icons.module';
const modelInvitation = new InvitationModel();
export class InvitationController {

	public async getInvitationsByIdUser(req: Request, res: Response) {
		// const idUser: number = parseInt(req.params.idUser);
		const idUser = 2;

		const invitations = await modelInvitation.getInvitationsByIdUser(idUser);

		res.status(200).json(invitations);
	}
}
import { Workspace } from "@types";
import prisma from "@/lib/prismadb";

async function getUserWorkspaces(userId: number): Promise<Workspace[]> {

	try {
		const workspaces = await prisma.workspace.findMany({
			where: {
				userWorkspace:{
					some:{
						idUser: userId
					}
				}
			},
		});
		return workspaces as Workspace[];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export default getUserWorkspaces;

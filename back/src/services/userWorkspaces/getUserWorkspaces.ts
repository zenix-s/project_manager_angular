import { Workspace } from "@types";
import { userWorkspaces } from "@/assets/data/api/userWorkspaces/userWorkspaces";



function  getUserWorkspaces(userId: number): Workspace[] {
	return userWorkspaces;
}

export default getUserWorkspaces;

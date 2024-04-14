import { Workspace } from "@types";
import { userWorkspaces } from "@/assets/data/api/workspaces";



function  getUserWorkspaces(userId: number): Workspace[] {
	return userWorkspaces;
}

export default getUserWorkspaces;

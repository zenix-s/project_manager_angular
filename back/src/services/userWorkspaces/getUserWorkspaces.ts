import { Workspace } from "@types";
import {
  workspaces as workspacesData,
  userWorkspaces,
} from "@/assets/data/api/data";

function getUserWorkspaces(userId: number): Workspace[] {
  const userWorkspaceIds = userWorkspaces
    .filter((userWorkspace) => userWorkspace.idUser === userId)
    .map((userWorkspace) => userWorkspace.idWorkspace);

  const workspaces: Workspace[] = workspacesData.filter((workspace) =>
    userWorkspaceIds.includes(workspace.id)
  );
	console.log(workspaces);
  return workspaces;
}

export default getUserWorkspaces;

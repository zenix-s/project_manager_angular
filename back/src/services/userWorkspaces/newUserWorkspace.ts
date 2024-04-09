import { Workspace } from "@types";

function newUserWorkspace(workspace: Workspace): Workspace {
  workspace.id = 6;
  workspace.createdAt = new Date();
  return workspace;
}

export default newUserWorkspace;

import getUserWorkspaces from "@/services/workspace/getUserWorkspaces";

export function listWorkspaces(userId: number) {
  const workspaces = getUserWorkspaces(userId);
  return workspaces;
}

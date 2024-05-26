import { Role, userWorkspaceData } from "@types";

export function checkUserEditPermission(userRole: Role) {
  const editRoles: Role[] = ["ADMIN", "MEMBER"];
  if (userRole === undefined || userRole === null) return false;

  if (editRoles.includes(userRole)) {
    return true;
  }
  return false;
}

// export function checkUserAdminPermission(workspaceUser: workspaceUsersData) {
//   const adminRoles: role[] = ["ADMIN"];
//   if (workspaceUser === undefined) {
//     return false;
//   }

//   if (adminRoles.includes(workspaceUser.role)) {
//     return true;
//   }

//   return false;
// }

export function checkUserAdminPermission(userRole: Role) {
  const adminRoles: Role[] = ["ADMIN"];
  if (userRole === undefined || userRole === null) return false;

  if (adminRoles.includes(userRole)) {
    return true;
  }

  return false;
}

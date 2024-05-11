import { role, workspaceUsersData } from "@types";

export function checkUserEditPermission(userRole: role) {
  const editRoles: role[] = ["ADMIN", "MEMBER"];
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

export function checkUserAdminPermission(userRole: role) {
  const adminRoles: role[] = ["ADMIN"];
  if (userRole === undefined || userRole === null) return false;

  if (adminRoles.includes(userRole)) {
    return true;
  }

  return false;
}

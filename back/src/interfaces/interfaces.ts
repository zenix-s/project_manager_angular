type role = "ADMIN" | "MEMBER" | "GUEST";
export type priority = "NONE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
type visibility = "PUBLIC" | "PRIVATE";

export const listPriority: priority[] = ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  settings?: any;
}

export interface Workspace {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
}

export interface Invitation {
  id: number;
  email: string;
  idWorkspace: number;
  createdAt: Date;
}

export interface UserWorkspace {
  id: number;
  idUser: number;
  idWorkspace: number;
  role: role;
  createdAt: Date;
}

export interface Task {
  id: number;
  createdAt: Date;
  idWorkspace: number;
  name: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  priority: priority;
  visibility: visibility;
  idProject?: number;
	dependentIdTask: number;
}

export interface project {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  idWorkspace: number;
}

export interface UserProject {
  id: number;
  idUser: number;
  idProject: number;
  role: role;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  idWorkspace: number;
  color: string;
  completed: boolean;
}

export interface UserTask {
  id: number;
  idUser: number;
  idTask: number;
  role: role;
  createdAt: Date;
}

export interface TaskCategory {
  id: number;
  idTask: number;
  categoryId: number;
  createdAt: Date;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  idWorkspace: number;
}

export interface UserProject {
  id: number;
  idUser: number;
  idProject: number;
  role: role;
  createdAt: Date;
}


export interface subtask {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  priority: priority;
  visibility: visibility;
  createdAt: Date;
  idWorkspace: number;
  dependentIdTask: number;
  categories: Category[];
}

export interface TaskWCategories {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  priority: priority;
  visibility: visibility;
  createdAt: Date;
  idWorkspace: number;
  dependentIdTask: number;
  categories: Category[];
}

export interface TaskData {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  priority: priority;
  visibility: visibility;
  createdAt: Date;
  idWorkspace: number;
  dependentIdTask: number;
  categories: Category[];
  subtasks: subtask[];
  // idProject?: number;
  // teams: Team[];
  // users: User[];
}

// export interface Team {
//   id: number;
//   name: string;
//   description?: string;
//   createdAt: Date;
//   idWorkspace: number;
// }


// export interface UserTeam {
//   id: number;
//   idUser: number;
//   idTeam: number;
//   role: role;
//   createdAt: Date;
// }

// export interface TeamProject {
//   id: number;
//   idTeam: number;
//   idProject: number;
//   role: role;
//   createdAt: Date;
// }

// export interface TeamTask {
//   id: number;
//   idTeam: number;
//   idTask: number;
//   role: role;
//   createdAt: Date;
// }

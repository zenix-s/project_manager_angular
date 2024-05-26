export type Role = 'ADMIN' | 'MEMBER' | 'GUEST';
export type priority = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type visibility = 'PUBLIC' | 'PRIVATE';

export const listPriority: priority[] = [
  'NONE',
  'LOW',
  'MEDIUM',
  'HIGH',
  'CRITICAL',
];

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  settings?: null;
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
  role: Role;
  createdAt: Date;
	deleted: boolean;
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
  dependentIdTask: number | null;
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
  role: Role;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  idWorkspace: number;
  color: string;
  completed: boolean;
	deleted: boolean;
}

export interface UserTask {
  id: number;
  idUser: number;
  idTask: number;
  role: Role;
  createdAt: Date;
}

export interface TaskCategory {
  id: number;
  idTask: number;
  idCategory: number;
}



export interface TaskData {
  task: Task;
  categories: Category[];
  subtasks: TaskData[] | null;
  // teams: Team[];
  // users: User[];
}

export interface userData {
  id: number;
  username: string;
  email: string;
}

export interface userWorkspaceData {
  id: number,
	idWorkspace: number,
  role: Role,
  user: userData
}

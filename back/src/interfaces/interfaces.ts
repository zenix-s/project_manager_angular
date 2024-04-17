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
  role: "ADMIN" | "MEMBER" | "GUEST";
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
  priority: "NONE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  // priority: 0 | 1 | 2 | 3 | 4;
  visibility: "PUBLIC" | "PRIVATE";
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  idWorkspace: number;
  color: string;
  completed: boolean;
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  idWorkspace: number;
}

export interface UserTeam {
  id: number;
  idUser: number;
  idTeam: number;
  role: "ADMIN" | "MEMBER" | "GUEST";
  createdAt: Date;
}

export interface UserTask {
  id: number;
  idUser: number;
  idTask: number;
  role: "ADMIN" | "MEMBER" | "GUEST";
  createdAt: Date;
}

export interface TeamTask {
  id: number;
  idTeam: number;
  idTask: number;
  role: "ADMIN" | "MEMBER" | "GUEST";
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
  role: "ADMIN" | "MEMBER" | "GUEST";
  createdAt: Date;
}

export interface TeamProject {
  id: number;
  idTeam: number;
  idProject: number;
  role: "ADMIN" | "MEMBER" | "GUEST";
  createdAt: Date;
}

export interface TaskData {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
  deadline?: Date;
  priority: "NONE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: Date;
  idWorkspace: number;
  categories: Category[];
  // idProject?: number;
  // teams: Team[];
  // users: User[];
}

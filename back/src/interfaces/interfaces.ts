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
  role: "admin" | "member" | "guest";
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
  // priority: 'none' |'low' | 'medium' | 'high' | 'urgent';
  priority: 0 | 1 | 2 | 3 | 4;
  visibility: "public" | "private";
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  idWorkspace: number;
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  idWorkspace: number;
}

export interface Project {
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
  role: "admin" | "member" | "guest";
  createdAt: Date;
}

export interface UserProject {
  id: number;
  idUser: number;
  idProject: number;
  role: "admin" | "member" | "guest";
  createdAt: Date;
}

export interface UserTask {
  id: number;
  idUser: number;
  idTask: number;
  role: "admin" | "member" | "guest";
  createdAt: Date;
}

export interface TeamTask {
  id: number;
  idTeam: number;
  idTask: number;
  role: "admin" | "member" | "guest";
  createdAt: Date;
}

export interface TeamProject {
  id: number;
  idTeam: number;
  idProject: number;
  role: "admin" | "member" | "guest";
  createdAt: Date;
}

export interface TaskCategory {
  id: number;
  idTask: number;
  categoryId: number;
  createdAt: Date;
}

export interface TaskProject {
  id: number;
  idTask: number;
  idProject: number;
  createdAt: Date;
}

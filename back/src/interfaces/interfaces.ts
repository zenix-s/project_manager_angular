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
	workspaceId: number;
	createdAt: Date;
}

export interface UserWorkspace {
	id: number;
	userId: number;
	workspaceId: number;
	role: 'admin' | 'member' | 'guest';
	createdAt: Date;
}

export interface Task {
	id: number;
	name: string;
	description?: string;
	createdAt: Date;
	workspaceId: number;
	visibility: 'public' | 'private';
}

export interface Category {
	id: number;
	name: string;
	description?: string;
	createdAt: Date;
	workspaceId: number;
}

export interface Team {
	id: number;
	name: string;
	description?: string;
	createdAt: Date;
	workspaceId: number;
}

export interface Project {
	id: number;
	name: string;
	description?: string;
	createdAt: Date;
	workspaceId: number;
}

export interface UserTeam {
	id: number;
	userId: number;
	teamId: number;
	role: 'admin' | 'member' | 'guest';
	createdAt: Date;
}

export interface UserProject {
	id: number;
	userId: number;
	projectId: number;
	role: 'admin' | 'member' | 'guest';
	createdAt: Date;
}

export interface UserTask {
	id: number;
	userId: number;
	taskId: number;
	role: 'admin' | 'member' | 'guest';
	createdAt: Date;
}

export interface TeamTask {
	id: number;
	teamId: number;
	taskId: number;
	role: 'admin' | 'member' | 'guest';
	createdAt: Date;
}

export interface TeamProject {
	id: number;
	teamId: number;
	projectId: number;
	role: 'admin' | 'member' | 'guest';
	createdAt: Date;
}

export interface TaskCategory {
	id: number;
	taskId: number;
	categoryId: number;
	createdAt: Date;
}

export interface TaskProject {
	id: number;
	taskId: number;
	projectId: number;
	createdAt: Date;
}

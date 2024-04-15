import {
  Category,
  Invitation,
  Task,
  TaskCategory,
  Team,
  TeamTask,
  User,
  UserTask,
  UserTeam,
  UserWorkspace,
  Workspace,
} from "@types";

export const users: User[] = [
  {
    id: 1,
    username: "user1",
    password: "password1",
    email: "user1@example.com",
    createdAt: new Date(),
    settings: { theme: "dark", notifications: true },
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    email: "user2@example.com",
    createdAt: new Date(),
    settings: { theme: "light", notifications: false },
  },
];

export const workspaces: Workspace[] = [
  {
    id: 1,
    name: "Workspace 1",
    description: "Description for Workspace 1",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Workspace 2",
    description: "Description for Workspace 2",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Workspace 3",
    description: "Description for Workspace 3",
    createdAt: new Date(),
  },
];

export const userWorkspaces: UserWorkspace[] = [
  {
    id: 1,
    idUser: 1,
    idWorkspace: 1,
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: 2,
    idUser: 1,
    idWorkspace: 2,
    role: "member",
    createdAt: new Date(),
  },
  {
    id: 3,
    idUser: 2,
    idWorkspace: 1,
    role: "member",
    createdAt: new Date(),
  },
];

export const invitations: Invitation[] = [];

export const tasks: Task[] = [
  {
    id: 1,
    createdAt: new Date(),
    idWorkspace: 1,
    name: "Task 1",
    description: "Description for Task 1",
    completed: false,
    deadline: new Date(),
    priority: 0,
    visibility: "public",
  },
  {
    id: 2,
    createdAt: new Date(),
    idWorkspace: 1,
    name: "Task 2",
    description: "Description for Task 2",
    completed: false,
    deadline: new Date(),
    priority: 1,
    visibility: "public",
  },
  {
    id: 3,
    createdAt: new Date(),
    idWorkspace: 1,
    name: "Task 3",
    description: "Description for Task 3",
    completed: false,
    deadline: new Date(),
    priority: 2,
    visibility: "public",
  },
  {
    id: 4,
    createdAt: new Date(),
    idWorkspace: 1,
    name: "Task 4",
    description: "Description for Task 4",
    completed: false,
    deadline: new Date(),
    priority: 3,
    visibility: "public",
  },
  {
    id: 5,
    createdAt: new Date(),
    idWorkspace: 1,
    name: "Task 5",
    description: "Description for Task 5",
    completed: false,
    deadline: new Date(),
    priority: 4,
    visibility: "public",
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Category 1",
    description: "Description for Category 1",
    createdAt: new Date(),
    idWorkspace: 1,
  },
  {
    id: 2,
    name: "Category 2",
    description: "Description for Category 2",
    createdAt: new Date(),
    idWorkspace: 1,
  },
  {
    id: 3,
    name: "Category 3",
    description: "Description for Category 3",
    createdAt: new Date(),
    idWorkspace: 2,
  },
];
export const taskCategories: TaskCategory[] = [
  {
    id: 1,
    idTask: 1,
    categoryId: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    idTask: 1,
    categoryId: 2,
    createdAt: new Date(),
  },
  {
    id: 3,
    idTask: 2,
    categoryId: 1,
    createdAt: new Date(),
  },
  {
    id: 4,
    idTask: 3,
    categoryId: 2,
    createdAt: new Date(),
  },
  {
    id: 5,
    idTask: 4,
    categoryId: 3,
    createdAt: new Date(),
  },
];

export const teams: Team[] = [];

export const userTeams: UserTeam[] = [];

export const userTasks: UserTask[] = [];

export const teamTasks: TeamTask[] = [];

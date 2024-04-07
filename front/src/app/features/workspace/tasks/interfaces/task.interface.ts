export interface Task {
  id: number;
  name: string;
  idWorkspace: number;
  description: string;
  dueDate: Date;
  completed: boolean;
}

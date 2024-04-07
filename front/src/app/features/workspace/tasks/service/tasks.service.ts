import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      dueDate: new Date(),
      completed: false,
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      dueDate: new Date(),
      completed: false,
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      dueDate: new Date(),
      completed: false,
    },
  ];

  private nextId = 4;

  getTasks() {
    return this.tasks;
  }

  addTask(task: Task) {
    const newTask = { ...task };
    newTask.id = this.nextId++;
    this.tasks.push(newTask);
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  constructor() {}
}

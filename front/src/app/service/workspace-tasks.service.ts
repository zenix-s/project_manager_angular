import { Injectable } from '@angular/core';
import { Task } from '@types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { port, backendUrl } from '@env';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}





  getTasks(idWorkspace: number): Observable<Task[]> {
    idWorkspace = parseInt(idWorkspace.toString());
    return this.http.get<Task[]>(`${backendUrl}:${port}/workspace/${idWorkspace}/task`);
  }

  // addTask(task: Task) {
  //   const newTask = { ...task };
  //   newTask.id = this.nextId++;
  //   this.tasks.push(newTask);
  // }

  // deleteTask(taskId: number) {
  //   this.tasks = this.tasks.filter((task) => task.id !== taskId);
  // }
}

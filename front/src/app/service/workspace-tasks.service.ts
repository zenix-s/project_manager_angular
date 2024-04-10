import { Injectable } from '@angular/core';
import { Task } from '@types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:5000';
  private resourceUrl = 'task';



  getTasks(idWorkspace: number): Observable<Task[]> {
    idWorkspace = parseInt(idWorkspace.toString());
    return this.http.get<Task[]>(`${this.baseUrl}/workspace/${idWorkspace}/${this.resourceUrl}`);
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

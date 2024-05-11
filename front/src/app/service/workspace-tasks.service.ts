import { Injectable, inject, signal } from '@angular/core';
import { Task, TaskData } from '@types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { port, backendUrl } from '@env';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);

  private _tasks = new BehaviorSubject<TaskData[]>([]);

  tasks$ = this._tasks.asObservable();

  cleanTasks() {
    this._tasks.next([]);
  }

  getTasks(idWorkspace: number) {
    idWorkspace = parseInt(idWorkspace.toString());

    this.http
      .get<TaskData[]>(`${backendUrl}:${port}/workspace/${idWorkspace}/task`, {
        headers: {
          Authorization: `${this.authenticationService.idUserLogged}`,
        },
      })
      .subscribe((tasks) => {
        this._tasks.next(tasks);
      });
  }

  addTask(idWorkspace: number, task: Task) {
    this.http
      .post<TaskData>(
        `${backendUrl}:${port}/workspace/${idWorkspace}/task`,
        task,
        {
          headers: {
            Authorization: `${this.authenticationService.idUserLogged}`,
          },
        }
      )
      .subscribe((task: TaskData) => {
        this._tasks.next([...this._tasks.value, task]);
      });
  }

  deleteTask(taskId: number) {
    this.http
      .delete<number>(`${backendUrl}:${port}/task/${taskId}`, {
        headers: {
          Authorization: `${this.authenticationService.idUserLogged}`,
        },
      })
      .subscribe((idTaskDeleted) => {
        this._tasks.next(
          this._tasks.value.filter((task) => task.task.id !== idTaskDeleted)
        );
      });
  }

  changeTask(task: Task) {
    this.http
      .put<TaskData>(`${backendUrl}:${port}/task/${task.id}`, task, {
        headers: {
          Authorization: `${this.authenticationService.idUserLogged}`,
        },
      })
      .subscribe((updatedTask: TaskData) => {
        this._tasks.next(
          this._tasks.value.map((t) => {
            if (t.task.id === updatedTask.task.id) {
              return updatedTask;
            }
            return t;
          })
        );
      });
  }
}

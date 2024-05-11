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
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      // .subscribe((tasks) => {
      //   this._tasks.next(tasks);
      // });
      .subscribe({
        next: (tasks) => {
          this._tasks.next(tasks);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }

  addTask(idWorkspace: number, task: Task) {
    this.http
      .post<TaskData>(
        `${backendUrl}:${port}/workspace/${idWorkspace}/task`,
        task,
        {
          headers: {
            Authorization: `${this.authenticationService.userToken}`,
          },
        }
      )
      // .subscribe((task: TaskData) => {
      //   this._tasks.next([...this._tasks.value, task]);
      // });
      .subscribe({
        next: (task) => {
          this._tasks.next([...this._tasks.value, task]);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }

  deleteTask(taskId: number) {
    this.http
      .delete<number>(`${backendUrl}:${port}/task/${taskId}`, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      // .subscribe((idTaskDeleted) => {
      //   this._tasks.next(
      //     this._tasks.value.filter((task) => task.task.id !== idTaskDeleted)
      //   );
      // });
      .subscribe({
        next: (idTaskDeleted) => {
          this._tasks.next(
            this._tasks.value.filter((task) => task.task.id !== idTaskDeleted)
          );
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }

  changeTask(task: Task) {
    this.http
      .put<TaskData>(`${backendUrl}:${port}/task/${task.id}`, task, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      // .subscribe((updatedTask: TaskData) => {
      //   this._tasks.next(
      //     this._tasks.value.map((t) => {
      //       if (t.task.id === updatedTask.task.id) {
      //         return updatedTask;
      //       }
      //       return t;
      //     })
      //   );
      // });
      .subscribe({
        next: (updatedTask) => {
          this._tasks.next(
            this._tasks.value.map((t) => {
              if (t.task.id === updatedTask.task.id) {
                return updatedTask;
              }
              return t;
            })
          );
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }
}

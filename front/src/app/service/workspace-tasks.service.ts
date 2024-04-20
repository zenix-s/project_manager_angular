import { Injectable } from "@angular/core";
import { Task, TaskData } from "@types";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { port, backendUrl } from "@env";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(idWorkspace: number): Observable<TaskData[]> {
    idWorkspace = parseInt(idWorkspace.toString());
    return this.http.get<TaskData[]>(
      `${backendUrl}:${port}/workspace/${idWorkspace}/task`,
    );
  }

  addTask(idWorkspace: number, task: Task): Observable<TaskData> {
    return this.http.post<TaskData>(
      `${backendUrl}:${port}/workspace/${idWorkspace}/task`,
      task,
    );
  }

  deleteTask(taskId: number): Observable<number> {
    return this.http.delete<number>(`${backendUrl}:${port}/task/${taskId}`);
  }

  changeTask(task: Task): Observable<TaskData> {
    console.log(task);
    return this.http.put<TaskData>(
      `${backendUrl}:${port}/task/${task.id}`,
      task,
    );
  }
}

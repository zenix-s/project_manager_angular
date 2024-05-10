import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { workspaceUsersData } from '@types';
import { backendUrl, port } from '@env';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WorkspaceUsersService {
  private http = inject(HttpClient);

  private _workspaceUsers = new BehaviorSubject<workspaceUsersData[]>([]);

  workspaceUsers$ = this._workspaceUsers.asObservable();

  getWorkspaceUsers(idWorkspace: number) {
    this.http
      .get<workspaceUsersData[]>(
        `${backendUrl}:${port}/workspace/${idWorkspace}/users`
      )
      .subscribe((data) => this._workspaceUsers.next(data));
  }
}

import { Injectable } from '@angular/core';
import { Workspace } from '@types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { port, backendUrl } from '@env';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private http: HttpClient) {}

  createWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.http.post<Workspace>(
      `${backendUrl}:${port}/workspace`,
      workspace
    );
  }

  deleteWorkspace(workspaceId: number) {
    this.http
      .delete(`${backendUrl}:${port}/workspace/${workspaceId}`)
      .subscribe((data) => {
        console.log(data);
      });
  }
}

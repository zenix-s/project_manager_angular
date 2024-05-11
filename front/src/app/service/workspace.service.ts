import { Injectable, inject } from '@angular/core';
import { Workspace } from '@types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { port, backendUrl } from '@env';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);

  createWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.http.post<Workspace>(
      `${backendUrl}:${port}/workspace`,
      workspace,
      {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      }
    );
  }

  deleteWorkspace(workspaceId: number) {
    this.http
      .delete(`${backendUrl}:${port}/workspace/${workspaceId}`, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }
}

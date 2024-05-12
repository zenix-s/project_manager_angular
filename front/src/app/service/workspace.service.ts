import { Injectable, inject } from '@angular/core';
import { Workspace } from '@types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { port, backendUrl } from '@env';
import { AuthenticationService } from './authentication.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  private ToasterService = inject(ToasterService);

  private _workspaces: BehaviorSubject<Workspace[]> = new BehaviorSubject<
    Workspace[]
  >([]);

  workspace$: Observable<Workspace[]> = this._workspaces.asObservable();

  cleanWorkspaces() {
    this._workspaces.next([]);
  }

  getWorkspaces() {
    this.http
      .get<Workspace[]>(`${backendUrl}:${port}/userWorkspaces`, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      .subscribe({
        next: (workspaces) => {
          this._workspaces.next(workspaces);
        },
        error: (error) => {
          // alert(error.error.message);
          this.ToasterService.addToast('Error', error.error.message, 'error');
        },
      });
  }

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
    interface Response {
      deleted: number;
      message: string;
    }
    this.http
      .delete(`${backendUrl}:${port}/workspace/${workspaceId}`, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      .subscribe({
        next: (data:any) => {
          this.ToasterService.addToast('Eliminar espacio de trabajo', data.message, 'success');
        },
        error: (error) => {
          this.ToasterService.addToast('Eliminar espacio de trabajo', error.error.message, 'error');
        },
      });
  }
}

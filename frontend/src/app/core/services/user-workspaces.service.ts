import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from '@app/core/authentication/service/authentication.service';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { Workspace } from '@env/interface.env';
import { BehaviorSubject } from 'rxjs';
import { backendUrl, port } from '@env/back.env';

@Injectable({
  providedIn: 'root',
})
export class UserWorkspacesService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  private toasterService = inject(ToasterService);

  private _workspaces: BehaviorSubject<Workspace[]> = new BehaviorSubject<
    Workspace[]
  >([]);

  workspaces$ = this._workspaces.asObservable();

  clearWorkspaces() {
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
          this.toasterService.error(error.error.message);
        },
      });
  }

  addWorkspace(workspace: Workspace) {
    this.http
      .post<Workspace>(`${backendUrl}:${port}/workspace`, workspace, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      .subscribe({
        next: (workspace) => {
          this.getWorkspaces();
          this.toasterService.success('Workspace created');
        },
        error: (error) => {
          this.toasterService.error(error.error.message);
        },
      });
  }

  deleteWorkspace(workspaceId: number) {
    this.http
      .delete(`${backendUrl}:${port}/workspace/${workspaceId}`, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      .subscribe({
        next: () => {
          this.getWorkspaces();
          this.toasterService.success('Workspace deleted');
        },
        error: (error) => {
          this.toasterService.error(error.error.message);
        },
      });
  }

  getWorkspacesSnapshot() {
    return this._workspaces.getValue();
  }
}

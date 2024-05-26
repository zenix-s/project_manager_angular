import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from '@app/core/authentication/service/authentication.service';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { backendUrl, port } from '@env/back.env';
import { workspaceUsersData } from '@env/interface.env';
import { BehaviorSubject } from 'rxjs';
import { Role } from '@env/interface.env';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceUsersService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  private toasterService = inject(ToasterService);

  private _workspaceUsers = new BehaviorSubject<workspaceUsersData[]>([]);

  users$ = this._workspaceUsers.asObservable();

  getWorkspaceUsers(idWorkspace: number) {
    this.http
      .get<workspaceUsersData[]>(
        `${backendUrl}:${port}/workspace/${idWorkspace}/users`,
        {
          headers: {
            Authorization: `${this.authenticationService.userToken}`,
          },
        }
      )
      .subscribe({
        next: (data) => this._workspaceUsers.next(data),
        error: (error) => {
          this.toasterService.error(error.error.message);
        },
      });
  }

  deleteWorkspaceUser(idWorkspace: number, idUser: number) {
    this.http
      .delete<workspaceUsersData[]>(
        `${backendUrl}:${port}/userWorkspace`,
        {
          headers: {
            Authorization: `${this.authenticationService.userToken}`,
            idWorkspace: `${idWorkspace}`,
            idUser: `${idUser}`,
          },
        }
      )
      .subscribe({
        next: (data) => this._workspaceUsers.next(data),
        error: (error) => {
          this.toasterService.error(error.error.message);
        },
      });
  }

  clearUsers() {
    this._workspaceUsers.next([]);
  }
}

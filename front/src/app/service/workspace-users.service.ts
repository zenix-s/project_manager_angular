import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { userWorkspaceData } from '@types';
import { backendUrl, port } from '@env';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ToasterService } from './toaster.service';
@Injectable({
  providedIn: 'root',
})
export class WorkspaceUsersService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  private ToasterService = inject(ToasterService);

  private _workspaceUsers = new BehaviorSubject<userWorkspaceData[]>([]);

  workspaceUsers$ = this._workspaceUsers.asObservable();

  getWorkspaceUsers(idWorkspace: number) {
    this.http
      .get<userWorkspaceData[]>(
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
          // alert(error.error.message);
          this.ToasterService.addToast('Error', error.error.message, 'error');
        },
      });
  }
}

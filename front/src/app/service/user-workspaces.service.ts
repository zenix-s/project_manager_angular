import { Injectable } from '@angular/core';
import { Workspace } from '@types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { port, backendUrl } from '@env';

@Injectable({
  providedIn: 'root',
})
export class UserWorkspacesService {
  private resourceUrl = 'userWorkspaces';

  constructor(private http: HttpClient) {}

  getUserWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(
      `${backendUrl}:${port}/${this.resourceUrl}`
    );
  }

  // addUserWorkspace(workspace: Workspace): Observable<Workspace> {

  // }

  // deleteUserWorkspace(workspaceId: number) {
  //   this.http.delete(`${backendUrl}:${port}/workspace/${workspaceId}`).subscribe((data) => {
  //     console.log(data)
  //   })
  // }

  updateUserWorkspace(workspace: Workspace) {}

  getUserWorkspaceById(workspaceId: number): Workspace {
    const workspace: Workspace = {
      id: 1,
      name: 'Workspace 1',
      description: 'Description 1',
      createdAt: new Date('2021-09-01'),
    };

    return workspace;
  }

  getWorkspaceId(): number {
    return 1;
  }
}
import { Injectable } from '@angular/core';
import { Workspace } from '@features/userWorkspaces/interfaces/workspace.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserWorkspacesService {
  private baseUrl = 'http://localhost:3000';
  private resourceUrl = 'userWorkspaces';
  private baseUrlJson = '/assets/data/api/userWorkspaces';
  private resourceUrlJson = 'userWorkspaces.json';
  private userId = 1;

  constructor(private http: HttpClient) {}

  getUserWorkspaces(): Observable<Workspace[]> {
    // const options = {
    //   headers: new HttpHeaders()
    //     .set('Access-Control-Allow-Origin', '*'),
    // };
    return this.http.get<Workspace[]>(`${ this.baseUrl }/${ this.resourceUrl }`);
    // return this.http.get<Workspace[]>(`${this.baseUrlJson}/${this.userId}/${this.resourceUrlJson}`);
  }

  // addUserWorkspace(workspace: Workspace) {
  //   const newWorkspace = { ...workspace };
  //   newWorkspace.id = this.nextId++;
  //   this.userWorkspaces.push(newWorkspace);
  // }

  // deleteUserWorkspace(workspaceId: number) {
  //   this.userWorkspaces = this.userWorkspaces.filter(
  //     (workspace) => workspace.id !== workspaceId
  //   );
  // }
}

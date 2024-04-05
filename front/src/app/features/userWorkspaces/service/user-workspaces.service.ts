import { Injectable } from '@angular/core';
import { Workspace } from '@features/userWorkspaces/interfaces/workspace.interface';

@Injectable({
  providedIn: 'root',
})
export class UserWorkspacesService {
  private userWorkspaces: Workspace[] = [
    {
      id: 1,
      name: 'Workspace 1',
      description: 'This is a description of workspace 1',
      owner: 'John Doe',
    },
    {
      id: 2,
      name: 'Workspace 2',
      description: 'This is a description of workspace 2',
      owner: 'Jane Doe',
    },
    {
      id: 3,
      name: 'Workspace 3',
      description: 'This is a description of workspace 3',
      owner: 'John Doe',
    },
    {
      id: 4,
      name: 'Workspace 4',
      description: 'This is a description of workspace 4',
      owner: 'Jane Doe',
    },
  ];
  private nextId = 5;

  getUserWorkspaces() {
    return this.userWorkspaces;
  }

  addUserWorkspace(workspace: Workspace) {
    const newWorkspace = { ...workspace };
    newWorkspace.id = this.nextId++;
    this.userWorkspaces.push(newWorkspace);
  }

  deleteUserWorkspace(workspaceId: number) {
    this.userWorkspaces = this.userWorkspaces.filter(
      (workspace) => workspace.id !== workspaceId
    );
  }

  constructor() {}
}

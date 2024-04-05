import { Component } from '@angular/core';
import { UserWorkspacesService } from '@features/userWorkspaces/service/user-workspaces.service';
import { Workspace } from '@features/userWorkspaces/interfaces/workspace.interface';


@Component({
  selector: 'app-user-workspace-page',
  templateUrl: './user-workspace-page.component.html',
  // styleUrl: ''
})
export class UserWorkspacePageComponent {
  constructor(private UserWorkspaceService: UserWorkspacesService) {}

  get userWorkspaces(): Workspace[] {
    return this.UserWorkspaceService.getUserWorkspaces();
  }

  addUserWorkspace(workspace: Workspace):void {
    this.UserWorkspaceService.addUserWorkspace(workspace);
  }

  deleteUserWorkspace(workspaceId: number):void {
    this.UserWorkspaceService.deleteUserWorkspace(workspaceId);
  }
}

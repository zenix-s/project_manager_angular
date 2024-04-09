import { Component } from '@angular/core';
import { Workspace } from '@types';
import { UserWorkspacesService } from '@features/userWorkspaces/service/user-workspaces.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user-workspace-page',
  templateUrl: './new-user-workspace.component.html',
})
export class NewUserWorkspaceComponent {
  constructor(
    private UserWorkspaceService: UserWorkspacesService,
    private router: Router
  ) {}

  addUserWorkspace(workspace: Workspace): void {
    this.UserWorkspaceService.addUserWorkspace(workspace)
      .subscribe((workspace) => {
        console.log(workspace);
        this.router.navigate(['/']);
      });
  }
}

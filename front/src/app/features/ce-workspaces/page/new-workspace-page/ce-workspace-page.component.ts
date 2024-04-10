import { Component } from '@angular/core';
import { Workspace } from '@types';
import { UserWorkspacesService } from '@app/service/user-workspaces.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-workspace-page',
  templateUrl: './ce-workspace-page.component.html',
})
export class CEWorkspacePageComponent {
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

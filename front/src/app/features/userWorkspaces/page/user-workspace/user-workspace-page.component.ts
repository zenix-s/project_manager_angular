import { Component, OnInit } from '@angular/core';
import { UserWorkspacesService } from '@features/userWorkspaces/service/user-workspaces.service';
import { Workspace } from '@features/userWorkspaces/interfaces/workspace.interface';

@Component({
  selector: 'app-user-workspace-page',
  templateUrl: './user-workspace-page.component.html',
  // styleUrl: ''
})
export class UserWorkspacePageComponent implements OnInit {
  constructor(private UserWorkspaceService: UserWorkspacesService) {}

  userWorkspaces: Workspace[] = [];

  ngOnInit(): void {
    this.UserWorkspaceService.getUserWorkspaces().subscribe((workspaces) => {
      this.userWorkspaces = workspaces;
      console.log("workspaces: ", this.userWorkspaces);
    });
  }

  // get userWorkspaces(): Workspace[] {
  //   return this.UserWorkspaceService.getUserWorkspaces();
  // }

  // deleteUserWorkspace(workspaceId: number):void {
  //   this.UserWorkspaceService.deleteUserWorkspace(workspaceId);
  // }
}

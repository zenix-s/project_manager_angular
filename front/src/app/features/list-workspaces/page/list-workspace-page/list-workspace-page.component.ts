import { Component, OnInit } from '@angular/core';
import { UserWorkspacesService } from '@service/user-workspaces.service';
import { Workspace } from '@types';

@Component({
  selector: 'app-list-workspace-page',
  templateUrl: './list-workspace-page.component.html',
  // styleUrl: ''
})
export class ListWorkspacePageComponent implements OnInit {
  constructor(private UserWorkspaceService: UserWorkspacesService) {}

  userWorkspaces: Workspace[] = [];

  ngOnInit(): void {
    this.UserWorkspaceService.getUserWorkspaces().subscribe((workspaces) => {
      this.userWorkspaces = workspaces;
    });
  }

  // get userWorkspaces(): Workspace[] {
  //   return this.UserWorkspaceService.getUserWorkspaces();
  // }

  deleteUserWorkspace(workspaceId: number):void {
    this.UserWorkspaceService.deleteUserWorkspace(workspaceId);
  }
}

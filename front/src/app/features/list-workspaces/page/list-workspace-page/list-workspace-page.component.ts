import { Component, OnInit } from '@angular/core';
import { UserWorkspacesService } from '@service/user-workspaces.service';
import { WorkspaceService } from '@app/service/workspace.service';
import { Workspace } from '@types';

@Component({
  selector: 'app-list-workspace-page',
  templateUrl: './list-workspace-page.component.html',
  styles: ':host { display: block; width: 100%; }',
})
export class ListWorkspacePageComponent implements OnInit {
  constructor(
    private UserWorkspaceService: UserWorkspacesService,
    private workspaceService: WorkspaceService
  ) {}

  userWorkspaces: Workspace[] = [];

  ngOnInit(): void {
    this.UserWorkspaceService.getUserWorkspaces().subscribe((workspaces) => {
      this.userWorkspaces = workspaces;
    });
  }

  // get userWorkspaces(): Workspace[] {
  //   return this.UserWorkspaceService.getUserWorkspaces();
  // }

}

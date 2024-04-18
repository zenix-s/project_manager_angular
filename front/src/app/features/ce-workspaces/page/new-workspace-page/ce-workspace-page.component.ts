import { Component } from "@angular/core";
import { Workspace } from "@types";
import { WorkspaceService } from "@app/service/workspace.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-workspace-page",
  templateUrl: "./ce-workspace-page.component.html",
})
export class CEWorkspacePageComponent {
  constructor(
    private WorkspacesService: WorkspaceService,
    private router: Router,
  ) {}

  addUserWorkspace(workspace: Workspace): void {
    this.WorkspacesService.createWorkspace(workspace).subscribe((workspace) => {
      this.router.navigate(["/"]);
    });
  }
}

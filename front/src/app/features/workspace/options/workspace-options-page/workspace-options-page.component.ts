import { Component, Input } from '@angular/core';
import { WorkspaceService } from '@service/workspace.service';

@Component({
  selector: 'app-workspace-options-page',
  templateUrl: './workspace-options-page.component.html',
})
export class WorkspaceOptionsPageComponent {

  constructor(
    private workspaceService: WorkspaceService
  ) {}

  @Input()
  idWorkspace: number = 0;

  DeleteWorkspace(): void {
    if (!this.idWorkspace) {
      return;
    }
    this.workspaceService.deleteWorkspace(this.idWorkspace)
  }

}

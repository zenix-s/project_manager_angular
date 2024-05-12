import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceService } from '@service/workspace.service';

@Component({
  selector: 'app-workspace-options-page',
  templateUrl: './workspace-options-page.component.html',
})
export class WorkspaceOptionsPageComponent {
  workspaceService = inject(WorkspaceService);
  router = inject(Router);

  @Input()
  idWorkspace: number = 0;

  DeleteWorkspace(): void {
    if (!this.idWorkspace) {
      return;
    }
    this.workspaceService.deleteWorkspace(this.idWorkspace)
    this.router.navigate(['/']);
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workspace } from '@app/features/userWorkspaces/interfaces/workspace.interface';

@Component({
  selector: 'app-workspace-item',
  templateUrl: './workspace-item.component.html',
  styleUrl: './workspace-item.component.css',
})
export class WorkspaceItemComponent {
  @Input()
  userWorkspace!: Workspace;

  @Output()
  public onDeleteWorkspace = new EventEmitter<number>();

  DeleteWorkspace(workspaceId: number): void {
    if (!workspaceId) {
      return;
    }
    this.onDeleteWorkspace.emit(workspaceId);
  }
}

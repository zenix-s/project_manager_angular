import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workspace } from '@features/userWorkspaces/interfaces/workspace.interface';

@Component({
  selector: 'app-list-workspaces',
  templateUrl: './list-workspaces.component.html',
  styleUrl: './list-workspaces.component.css',
})
export class ListWorkspacesComponent {
  @Input()
  userWorkspaces: Workspace[] = [];

  @Output()
  public onDeleteWorkspace = new EventEmitter<number>();

  DeleteWorkspace(workspaceId: number): void {
    if (!workspaceId) {
      return;
    }
    this.onDeleteWorkspace.emit(workspaceId);
  }
}

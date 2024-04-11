import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workspace } from '@types';

@Component({
  selector: 'app-workspace-item',
  templateUrl: './workspace-item.component.html',
})
export class WorkspaceItemComponent {
  @Input()
  userWorkspace!: Workspace;
}

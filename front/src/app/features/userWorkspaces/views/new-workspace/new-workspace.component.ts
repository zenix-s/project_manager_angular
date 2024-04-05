import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Workspace } from '@features/userWorkspaces/interfaces/workspace.interface';

@Component({
  selector: 'app-new-workspace',
  templateUrl: './new-workspace.component.html',
  styleUrl: './new-workspace.component.css',
})
export class NewWorkspaceComponent {

  public workspaceForm = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });


  get workspace(): Workspace {
    const workspace = this.workspaceForm.value as Workspace;
    return workspace;
  }

  @Output()
  public onCreateWorkspace = new EventEmitter<Workspace>();


  onSubmit(): void {
    const workspace = this.workspace;
    this.onCreateWorkspace.emit(workspace);
  }

}

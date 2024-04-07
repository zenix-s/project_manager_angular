import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Workspace } from '@features/userWorkspaces/interfaces/workspace.interface';

@Component({
  selector: 'app-new-workspace',
  templateUrl: './new-workspace.component.html',
})
export class NewWorkspaceComponent {

  constructor(private fb: FormBuilder) {}

  workspaceForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
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

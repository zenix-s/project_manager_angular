import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-workspace-button',
  template: `
    <button
    (click)="DeleteWorkspace()"
    class="border border-solid border-red-600 p-2 ">
      Eliminar workspace
    </button>
  `,
  styles: ``
})
export class DeleteWorkspaceButtonComponent {



  @Output()
  public onDeleteWorkspace = new EventEmitter();

  DeleteWorkspace(): void {
    this.onDeleteWorkspace.emit();
  }
}

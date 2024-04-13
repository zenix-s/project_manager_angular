import { Component } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  // template: `
  //   <button (click)="openDialog(dialog)">Abrir dialog</button>
  //   <dialog #dialog>
  //     Hola mundo
  //     <button (click)="dialog.close()">Cerrar</button>
  //   </dialog>
  // `,
  styles: ``,
})
export class TaskFormComponent {
  constructor() {}

  openDialog(dialog: HTMLDialogElement) {
    dialog.showModal();
  }

  closeDialog(dialog: HTMLDialogElement) {
    dialog.close();
  }
}

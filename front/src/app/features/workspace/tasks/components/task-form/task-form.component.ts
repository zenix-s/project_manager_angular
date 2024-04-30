import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Task } from "@types";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styles: ``,
})
export class TaskFormComponent {
  constructor(private fb: FormBuilder) {}

  @Output()
  onSubmitTask = new EventEmitter<Task>();

  taskForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: ["", [Validators.maxLength(255), Validators.minLength(3)]],
    deadline: [null, Validators.required],
    priority: ["NONE", Validators.required],
    visibility: ["PUBLIC", Validators.required],
  });

  onSubmit(dialog: HTMLDialogElement) {
    this.onSubmitTask.emit(this.taskForm.value);
    console.log(this.taskForm.value);
    this.closeDialog(dialog);
    this.taskForm.reset();
  }

  openDialog(dialog: HTMLDialogElement) {
    dialog.showModal();
  }

  closeDialog(dialog: HTMLDialogElement) {
    dialog.close();
  }
}

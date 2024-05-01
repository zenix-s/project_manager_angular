import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '@types';
import { FormTasksService } from '@app/features/workspace/tasks/services/form-tasks.service';
import { TasksService } from '@app/service/workspace-tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styles: ``,
})
export class TaskFormComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  taskFormService = inject(FormTasksService);
  taskService = inject(TasksService);

  @Input()
  task: Task | null = null;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement> | undefined;

  @Input()
  idWorkspace!: number;

  isOpen: WritableSignal<boolean> = signal<boolean>(false);

  taskForm: FormGroup = this.fb.group({
    name: [
      this.task ? this.task.name : '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: [
      this.task ? this.task.description : '',
      [Validators.maxLength(255), Validators.minLength(3)]
    ],
    deadline: [
      this.task ? this.task.deadline : '',
      Validators.required],
    priority: [
      this.task ? this.task.priority : 'NONE',
      Validators.required
    ],
    visibility: [
      this.task ? this.task.visibility : 'PUBLIC',
      Validators.required
    ],
  });

  closeDialog() {
    this.taskFormService.close();
  }

  openDialog() {
    this.taskFormService.open();
  }

  private _onOpenDialog() {
    if (!this.dialog) return;
    if (this.isOpen() === false) return;
    this.dialog.nativeElement.showModal();
  }

  private _onCloseDialog() {
    if (!this.dialog) {
      return;
    }
    this.dialog.nativeElement.close();
    this.taskForm.reset();
    this.task = null;
  }
  onSubmit() {
    this.taskService.addTask(this.idWorkspace, this.taskForm.value);
    console.log(this.taskForm.value);
    this._onCloseDialog();
    this.taskForm.reset();
  }

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this._onOpenDialog();
      } else if (!this.isOpen()) {
        this._onCloseDialog();
      }
    });
  }

  ngOnInit(): void {
    this.taskFormService.isOpen$.subscribe((isOpen) => {
      this.isOpen.set(isOpen);
    });
  }

  ngOnDestroy(): void {
    this.taskFormService.close();
    this.taskForm.reset();
  }
}

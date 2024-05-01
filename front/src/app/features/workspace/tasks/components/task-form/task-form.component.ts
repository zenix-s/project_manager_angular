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
import { Task, TaskData } from '@types';
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

  task: TaskData | null = null;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement> | undefined;

  @Input()
  idWorkspace!: number;

  isOpen: WritableSignal<boolean> = signal<boolean>(false);

  taskForm: FormGroup = this.fb.group({
    name: [
      this.task ? this.task.task.name : '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: [
      this.task ? this.task.task.description : '',
      [Validators.maxLength(255), Validators.minLength(3)],
    ],
    deadline: [this.task ? this.task.task.deadline : '', Validators.required],
    priority: [
      this.task ? this.task.task.priority : 'NONE',
      Validators.required,
    ],
    visibility: [
      this.task ? this.task.task.visibility : 'PUBLIC',
      Validators.required,
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
    this.taskForm.patchValue({
      priority: 'NONE',
    });
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
    this.taskFormService.task$.subscribe((task) => {
      this.task = task;
      if (task) {
        this.taskForm.patchValue({
          name: task.task.name,
          description: task.task.description,
          deadline: task.task.deadline,
          priority: task.task.priority,
          visibility: task.task.visibility,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.taskFormService.close();
    this.taskForm.reset();
    // this.taskForm. set priority to NONE
    this.taskForm.patchValue({
      priority: 'NONE',
    });
  }
}

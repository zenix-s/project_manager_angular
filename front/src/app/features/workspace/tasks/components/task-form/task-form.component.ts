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
    id: [null],
    name: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: [
      '',
      [Validators.maxLength(255), Validators.minLength(3)],
    ],
    deadline: ['', Validators.required],
    priority: [
      'NONE',
      Validators.required,
    ],
    visibility: [
      // this.task ? this.task.task.visibility : 'PUBLIC',
      'PUBLIC', // 'PUBLIC' | 'PRIVATE' | 'PROTECTED
      Validators.required,
    ],
    dependentIdTask: [null],
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
    if (this.task) {
      // this.taskService.changeTask(this.taskForm.value);
      // this.taskForm.value.id = this.task.task.id;
      console.log(this.taskForm.value);

      this.taskFormService.close();
      this.taskForm.reset();
      this.taskForm.patchValue({
        priority: 'NONE',
      });
      return;
    }
    // this.taskService.addTask(this.idWorkspace, this.taskForm.value);
    console.log(this.taskForm.value);
    this.taskForm.reset();
    this.taskFormService.close();
    this.taskForm.patchValue({
      priority: 'NONE',
    });
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
          id: task.task.id,
          name: task.task.name,
          description: task.task.description,
          deadline: task.task.deadline,
          priority: task.task.priority,
          visibility: task.task.visibility,
          dependentIdTask: task.task.dependentIdTask,
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

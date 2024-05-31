import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskFormService } from './task-form.service';
import { WorkspaceTasksService } from '@app/core/services/workspace-tasks.service';
import { TaskData } from '@env/interface.env';
import { Subscription } from 'rxjs';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputSelectComponent } from '@app/shared/components/input-select/input-select.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ModalComponent,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    InputSelectComponent,
    CommonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  taskFormService = inject(TaskFormService);
  taskService = inject(WorkspaceTasksService);

  isOpen: WritableSignal<boolean> = signal<boolean>(false);
  task: WritableSignal<TaskData | null> = signal<TaskData | null>(null);

  isOpenSub!: Subscription;
  taskSub!: Subscription;

  @Input() idWorkspace: number = 0;

  taskForm: FormGroup = this.fb.group({
    id: [null],
    name: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: ['', [Validators.maxLength(255), Validators.minLength(3)]],
    deadline: [null as Date | null],
    priority: ['NONE', Validators.required],
    visibility: ['PUBLIC', Validators.required],
    dependentIdTask: [null],
    completed: [false],
  });

  onSubmit() {
    if (this.taskForm.value.id !== null) {
      this.taskService.updateTask(this.taskForm.value.id, {
        ...this.taskForm.value,
        idWorkspace: this.idWorkspace,
        deadline: this.taskForm.value.deadline ? this.taskForm.value.deadline : null,
      });
      this.taskFormService.close();
      this.taskForm.reset();
      this.taskForm.patchValue({
        priority: 'NONE',
      });
      return;
    }
    this.taskService.createTask(this.idWorkspace, this.taskForm.value);
    this.taskForm.reset();
    this.taskFormService.close();
    this.taskForm.patchValue({
      priority: 'NONE',
    });
  }

  ngOnInit(): void {
    this.isOpenSub = this.taskFormService.isOpen$.subscribe((isOpen) => {
      this.isOpen.set(isOpen);
    });

    this.taskSub = this.taskFormService.task$.subscribe((task) => {
      this.task.set(task);
      if (task) {
        this.taskForm.patchValue({
          id: task.task.id,
          name: task.task.name,
          description: task.task.description,
          deadline: task.task.deadline ? new Date(task.task.deadline) : null,
          priority: task.task.priority,
          visibility: task.task.visibility,
          dependentIdTask: task.task.dependentIdTask,
          completed: task.task.completed,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.isOpenSub.unsubscribe();
    this.taskSub.unsubscribe();

    this.taskFormService.close();
    this.taskForm.reset();
    this.taskForm.patchValue({
      priority: 'NONE',
    });
  }
}

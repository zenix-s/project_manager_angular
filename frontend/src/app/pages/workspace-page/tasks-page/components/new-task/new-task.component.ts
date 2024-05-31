import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { CommonModule } from '@angular/common';
import { WorkspaceTasksService } from '@app/core/services/workspace-tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  fb = inject(FormBuilder);
  WorkspaceTasksService = inject(WorkspaceTasksService);

  @Input() idWorkspace!: number;

  formTask = this.fb.group({
    title: [''],
  });

  createTask(){
    if (this.formTask.value.title) {
      this.WorkspaceTasksService.createTask(
        this.idWorkspace,
        {
          name: this.formTask.value.title,
          description: '',
          priority: 'NONE',
          createdAt: new Date(),
          dependentIdTask: null,
          completed: false,
          idWorkspace: this.idWorkspace,
          visibility: 'PUBLIC',
          id: 0,
        }
      )
      this.formTask.reset();
    }
  }
}

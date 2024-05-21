import { Component, Input, OnInit, inject } from '@angular/core';
import { WorkspaceCategoriesService } from '@app/core/services/workspace-categories.service';
import { DropdownItemComponent } from '@app/shared/components/dropdown/dropdown-item/dropdown-item.component';
import { DropdownListComponent } from '@app/shared/components/dropdown/dropdown-list/dropdown-list.component';
import { DropdownComponent } from '@app/shared/components/dropdown/dropdown/dropdown.component';
import { ToggleComponent } from '@app/shared/components/toggle/toggle.component';
import { TooltipComponent } from '@app/shared/components/tooltip/tooltip.component';
import { Category, TaskData, priority } from '@env/interface.env';
import { CommonModule } from '@angular/common';
import { WorkspaceTasksService } from '@app/core/services/workspace-tasks.service';
import { WorkspaceTaskCategoriesService } from '@app/core/services/workspace-task-categories.service';
import { TaskFormService } from '../task-form/task-form.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    ToggleComponent,
    DropdownComponent,
    DropdownListComponent,
    DropdownItemComponent,
    TooltipComponent,
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  categoryService = inject(WorkspaceCategoriesService);
  taskService = inject(WorkspaceTasksService);
  taskCategoryService = inject(WorkspaceTaskCategoriesService);
  taskFormService = inject(TaskFormService);
  @Input()
  task!: TaskData;

  taskHaveCategory(category: Category) {
    return this.task.categories.some((cat) => cat.id === category.id);
  }

  updateCompleteStatus(status: boolean) {
    this.taskService.updateTask(this.task.task.id, {
      ...this.task.task,
      completed: status,
    });
  }

  updatePriority(priority: priority) {
    this.taskService.updateTask(this.task.task.id, {
      ...this.task.task,
      priority,
    });
  }

  updateDeadline(date: Date | null) {
    this.taskService.updateTask(this.task.task.id, {
      ...this.task.task,
      deadline: date ? date : undefined,
    });
  }
  tomorrowsDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }
  endOfWeekDate() {
    // get this friday if today is before friday
    // if friday or after, get next friday
    const date = new Date();
    const day = date.getDay();
    const diff = 5 - day;
    date.setDate(date.getDate() + diff);
    return date;
  }

  addCategory(idCategory: number) {
    this.taskCategoryService.addCategoryToTask(
      {
        idTask: this.task.task.id,
        idCategory,
      },
      this.task.task.idWorkspace
    );
  }

  removeCategory(idCategory: number) {
    this.taskCategoryService.removeCategoryFromTask(
      {
        idTask: this.task.task.id,
        idCategory,
      },
      this.task.task.idWorkspace
    );
  }

  toggleCategory(category: Category) {
    if (this.taskHaveCategory(category)) {
      this.removeCategory(category.id);
    } else {
      this.addCategory(category.id);
    }
  }

  openEditTaskForm() {
    this.taskFormService.task = this.task;
    this.taskFormService.open();
  }

  dependency(idTask: number) {
    return this.task.task.dependentIdTask === idTask;
  }

  addDependency(idTask: number | null) {
    if (this.task.task.dependentIdTask === idTask) {
      idTask = null;
    }
    this.taskService.updateTask(this.task.task.id, {
      ...this.task.task,
      dependentIdTask: idTask,
    });
    if (idTask === null) {
      this.taskService.addTask(this.task);
    }
    if (!this.task.task.dependentIdTask) return;
    const dependentTask = this.taskService.getTask(
      this.task.task.dependentIdTask
    );
    if (!dependentTask) return;
    this.taskService.updateTask(dependentTask.task.id, dependentTask.task);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TasksItemComponent } from './components/tasks-item/tasks-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { InputSelectPriorityComponent } from './components/task-form/components/input-select-priority/input-select-priority.component';
import { TaskItemComponent } from './components/tasks-item/task-item/task-item.component';
import { SelectPriorityComponent } from './components/tasks-item/task-item/components/select-priority/select-priority.component';


@NgModule({
  declarations: [
    TasksPageComponent,
    ListTasksComponent,
    TasksItemComponent,
    TaskFormComponent,
    InputSelectPriorityComponent,
    TaskItemComponent,
    SelectPriorityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TasksPageComponent
  ]
})
export class TasksModule { }

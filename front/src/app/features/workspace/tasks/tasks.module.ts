import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TasksItemComponent } from './components/tasks-item/tasks-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';


@NgModule({
  declarations: [
    TasksPageComponent,
    ListTasksComponent,
    TasksItemComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TasksPageComponent
  ]
})
export class TasksModule { }

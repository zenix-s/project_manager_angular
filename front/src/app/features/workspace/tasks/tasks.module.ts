import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTasksPageComponent } from './pages/list-tasks-page/list-tasks-page.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';


@NgModule({
  declarations: [
    ListTasksPageComponent,
    ListTasksComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ListTasksPageComponent
  ]
})
export class TasksModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTasksPageComponent } from './pages/list-tasks-page/list-tasks-page.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './views/list-tasks/list-tasks.component';


@NgModule({
  declarations: [
    ListTasksPageComponent,
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }

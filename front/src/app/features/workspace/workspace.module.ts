import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TasksModule],
  exports: [TasksModule],
})
export class WorkspaceModule {}

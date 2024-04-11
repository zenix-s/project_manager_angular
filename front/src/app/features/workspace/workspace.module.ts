import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksModule } from './tasks/tasks.module';
import { RouterModule } from '@angular/router';
import { WorkspacePageComponent } from './workspace-page/workspace-page.component';
import { OptionsModule } from './options/options.module';
@NgModule({
  declarations: [WorkspacePageComponent],
  imports: [CommonModule, TasksModule, RouterModule, OptionsModule],
  exports: [TasksModule, WorkspacePageComponent],
})
export class WorkspaceModule {}

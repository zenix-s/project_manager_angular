import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksModule } from './tasks/tasks.module';
import { RouterModule } from '@angular/router';
import { WorkspacePageComponent } from './workspace-page/workspace-page.component';
import { UsersPageComponent } from './users/users-page/users-page.component';
import { OptionsModule } from './options/options.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
@NgModule({
  declarations: [WorkspacePageComponent],
  imports: [CommonModule, TasksModule, RouterModule, OptionsModule, CategoriesModule, UsersModule],
  exports: [TasksModule, WorkspacePageComponent],
})
export class WorkspaceModule {}

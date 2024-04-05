import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserWorkspacePageComponent } from '@features/userWorkspaces/page/user-workspace-page.component';
import { ListWorkspacesComponent } from '@features/userWorkspaces/views/list-workspaces/list-workspaces.component';
import { WorkspaceItemComponent } from '@features/userWorkspaces/views/list-workspaces/components/workspace-item/workspace-item.component';
import { NewWorkspaceComponent } from './views/new-workspace/new-workspace.component';

@NgModule({
  declarations: [
    UserWorkspacePageComponent,
    ListWorkspacesComponent,
    WorkspaceItemComponent,
    NewWorkspaceComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    UserWorkspacePageComponent
  ]
})
export class UserWorkspacesModule { }

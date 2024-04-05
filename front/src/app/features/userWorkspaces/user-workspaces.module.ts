import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserWorkspacePageComponent } from '@features/userWorkspaces/page/user-workspace/user-workspace-page.component';
import { ListWorkspacesComponent } from '@features/userWorkspaces/views/list-workspaces/list-workspaces.component';
import { WorkspaceItemComponent } from '@features/userWorkspaces/views/list-workspaces/components/workspace-item/workspace-item.component';
import { NewWorkspaceComponent } from './views/new-workspace/new-workspace.component';
import { NewUserWorkspaceComponent } from './page/new-user-workspace/new-user-workspace-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserWorkspacePageComponent,
  },
  {
    path: 'newWorkspace',
    component: NewUserWorkspaceComponent,
  },
  {
    path: 'workspace/:id',
    component: UserWorkspacePageComponent,
  }
];

@NgModule({
  declarations: [
    UserWorkspacePageComponent,
    ListWorkspacesComponent,
    WorkspaceItemComponent,
    NewWorkspaceComponent,
    NewUserWorkspaceComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    UserWorkspacePageComponent,
    NewUserWorkspaceComponent,
    RouterModule,
  ]
})
export class UserWorkspacesModule { }

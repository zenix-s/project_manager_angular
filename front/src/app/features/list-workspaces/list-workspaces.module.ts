import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ListWorkspacePageComponent } from './page/list-workspace-page/list-workspace-page.component';
import { ListWorkspacesComponent } from './views/list-workspaces/list-workspaces.component';
import { WorkspaceItemComponent } from './views/list-workspaces/components/workspace-item/workspace-item.component';


@NgModule({
  declarations: [
    ListWorkspacePageComponent,
    ListWorkspacesComponent,
    WorkspaceItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  exports: [
    ListWorkspacePageComponent,
    RouterModule,
  ]
})
export class ListWorkspacesModule { }

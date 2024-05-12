import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ListWorkspacePageComponent } from './list-workspace-page/list-workspace-page.component';
import { WorkspaceItemComponent } from './components/workspace-item/workspace-item.component';


@NgModule({
  declarations: [
    ListWorkspacePageComponent,
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

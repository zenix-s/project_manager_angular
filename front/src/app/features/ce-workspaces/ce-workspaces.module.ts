import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CEWorkspacePageComponent } from './page/new-workspace-page/ce-workspace-page.component';
import { CEFormWorkspaceComponent } from './views/new-workspace/ce-form-workspace.component';

@NgModule({
  declarations: [CEWorkspacePageComponent, CEFormWorkspaceComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CEWorkspacePageComponent],
})
export class CeWorkspacesModule {}

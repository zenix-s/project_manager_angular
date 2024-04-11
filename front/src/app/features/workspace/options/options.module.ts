import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceOptionsPageComponent } from './workspace-options-page/workspace-options-page.component';
import { DeleteWorkspaceButtonComponent } from './components/delete-workspace-button/delete-workspace-button.component';



@NgModule({
  declarations: [
    WorkspaceOptionsPageComponent,
    DeleteWorkspaceButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WorkspaceOptionsPageComponent
  ]
})
export class OptionsModule { }

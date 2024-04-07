import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/userWorkspaces/user-workspaces.module').then(
        (m) => m.UserWorkspacesModule
      ),
  },
  {
    path: 'workspace',
    loadChildren: () =>
      import('./features/workspace/workspace.module').then(
        (m) => m.WorkspaceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

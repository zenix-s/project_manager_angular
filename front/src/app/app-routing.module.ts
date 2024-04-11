import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWorkspacePageComponent } from '@features/list-workspaces/page/list-workspace-page/list-workspace-page.component';
import { CEWorkspacePageComponent } from '@features/ce-workspaces/page/new-workspace-page/ce-workspace-page.component';
import { ListTasksPageComponent } from '@features/workspace/tasks/pages/list-tasks-page/list-tasks-page.component';
import { WorkspacePageComponent } from './features/workspace/workspace-page/workspace-page.component';





// / --> basic route for the list-workspaces module
// /workspace --> basic route for the workspace module
// /workspace/new --> basic route for the ce-workspaces module
// /workspace/edit/:id --> basic route for the ce-workspaces module

// /workspace/:id --> basic route for the workspace module
// /workspace/:id/teams --> route for the workspace module

const routes: Routes = [
  {
    path: '',
    component: ListWorkspacePageComponent,
  },
  {
    path: 'workspace/new',
    component: CEWorkspacePageComponent,
  },
  {
    path: 'workspace/edit/:idWorkspace',
    component: CEWorkspacePageComponent,
  },
  // {
  //   path: 'workspace/:idWorkspace',
  //   component: ListTasksPageComponent,
  // },
  {
    path: 'workspace/:idWorkspace',
    component: WorkspacePageComponent,
  },
  // {
  //   path: 'workspace/:idWorkspace/teams',
  //   component
  // }
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./features/list-workspaces/list-workspaces.module').then(
  //       (m) => m.ListWorkspacesModule
  //     ),
  // },
  // {
  //   path: 'workspace',
  //   loadChildren: () =>
  //     import('./features/workspace/workspace.module').then(
  //       (m) => m.WorkspaceModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

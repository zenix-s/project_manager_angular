import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWorkspacePageComponent } from '@features/list-workspaces/page/list-workspace-page/list-workspace-page.component';
import { CEWorkspacePageComponent } from '@features/ce-workspaces/page/new-workspace-page/ce-workspace-page.component';
import { WorkspacePageComponent } from './features/workspace/workspace-page/workspace-page.component';
import { PageTestComponent } from './features/tests/page-test/page-test.component';
import { AuthenticationPageComponent } from './features/authentication/authentication-page/authentication-page.component';
import { authGuard } from './auth.guard';

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
    canActivate: [authGuard],
  },
  {
    path: 'workspace/new',
    component: CEWorkspacePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'workspace/edit/:idWorkspace',
    component: CEWorkspacePageComponent,
    canActivate: [authGuard],
  },
  // {
  //   path: 'workspace/:idWorkspace',
  //   component: TasksPageComponent,
  // },
  {
    path: 'workspace/:idWorkspace',
    component: WorkspacePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'authentication',
    component: AuthenticationPageComponent,
  },
  {
    path: 'test',
    component: PageTestComponent,
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

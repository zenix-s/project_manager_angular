import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWorkspacePageComponent } from '@app/features/list-workspaces/list-workspace-page/list-workspace-page.component';
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
  {
    path: 'workspace/:idWorkspace',
    component: WorkspacePageComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        component: WorkspacePageComponent,
      },
    ],
  },
  {
    path: 'authentication',
    component: AuthenticationPageComponent,
  },
  {
    path: 'test',
    component: PageTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

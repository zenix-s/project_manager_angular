import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { WorkspacePageComponent } from './pages/workspace-page/workspace-page.component';
import { TasksPageComponent } from './pages/workspace-page/tasks-page/tasks-page.component';
import { CategoriesPageComponent } from './pages/workspace-page/categories-page/categories-page.component';
import { UsersPageComponent } from './pages/workspace-page/users-page/users-page.component';
import { OptionsPageComponent } from './pages/workspace-page/options-page/options-page.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { authGuard } from './core/authentication/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationPageComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardPageComponent,
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'workspace/:idWorkspace',
        component: WorkspacePageComponent,
        children: [
          {
            path: '',
            component: TasksPageComponent,
          },
          {
            path: 'tasks',
            redirectTo: '',
          },
          {
            path: 'categories',
            component: CategoriesPageComponent,
          },
          {
            path: 'users',
            component: UsersPageComponent,
          },
          {
            path: 'options',
            component: OptionsPageComponent,
          },
        ],
      },
    ],
  },
];

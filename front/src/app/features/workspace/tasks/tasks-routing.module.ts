import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListTasksPageComponent } from './pages/list-tasks-page/list-tasks-page.component';

const routes: Routes = [
  {
    path: '',
    component: ListTasksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}

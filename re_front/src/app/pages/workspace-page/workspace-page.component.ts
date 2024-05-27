import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
  RouterModule,
} from '@angular/router';
import { WorkspaceCategoriesService } from '@app/core/services/workspace-categories.service';
import { WorkspaceTasksService } from '@app/core/services/workspace-tasks.service';
import { WorkspaceUsersService } from '@app/core/services/workspace-users.service';
import { SectionComponent } from '@app/shared/components/section/section.component';
import { SidebarComponent } from '@app/shared/components/sidebar/sidebar.component';
import { Category, TaskData, workspaceUsersData } from '@env/interface.env';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workspace-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SectionComponent,
    SidebarComponent,
    RouterModule,
  ],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.css',
})
export class WorkspacePageComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  workspaceTasksService = inject(WorkspaceTasksService);
  workspaceCategoriesService = inject(WorkspaceCategoriesService);
  workspaceUsersService = inject(WorkspaceUsersService);


  idWorkspace: number = 0;
  reloader!:any;

  tasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  categories: WritableSignal<Category[]> = signal<Category[]>([]);
  users: WritableSignal<workspaceUsersData[]> = signal<workspaceUsersData[]>(
    []
  );

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.paramMap.has('idWorkspace'))
      this.router.navigate(['/']);
    const idWorkspace = parseInt(
      this.activatedRoute.snapshot.paramMap.get('idWorkspace') as any
    );
    if (isNaN(idWorkspace) || !isFinite(idWorkspace) || idWorkspace < 0) {
      this.router.navigate(['/']);
    }
    this.idWorkspace = idWorkspace;


    // this.workspaceTasksService.getTasks(this.idWorkspace);
    // this.workspaceCategoriesService.getWorkspaceCategories(this.idWorkspace);
    // this.workspaceUsersService.getWorkspaceUsers(this.idWorkspace);

    this.reloader = setInterval(() => {
      this.workspaceTasksService.getTasks(this.idWorkspace);
      this.workspaceCategoriesService.getWorkspaceCategories(this.idWorkspace);
      this.workspaceUsersService.getWorkspaceUsers(this.idWorkspace);
    }, 1000)
  }

  ngOnDestroy(): void {
    this.workspaceTasksService.clearTasks();
    this.workspaceCategoriesService.clearCategories();
    this.workspaceUsersService.clearUsers();
    clearInterval(this.reloader);
  }
}

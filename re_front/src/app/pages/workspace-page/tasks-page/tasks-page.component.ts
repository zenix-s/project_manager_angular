import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceCategoriesService } from '@app/core/services/workspace-categories.service';
import { WorkspaceTasksService } from '@app/core/services/workspace-tasks.service';
import { WorkspaceUsersService } from '@app/core/services/workspace-users.service';
import { SectionComponent } from '@app/shared/components/section/section.component';
import { Category, TaskData, workspaceUsersData } from '@env/interface.env';
import { Subscription } from 'rxjs';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { SubtaskContainerComponent } from './components/subtask-container/subtask-container.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [SectionComponent, TaskContainerComponent, TaskItemComponent, SubtaskContainerComponent],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export class TasksPageComponent implements OnInit, OnDestroy{

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  workspaceTasksService = inject(WorkspaceTasksService);
  workspaceCategoriesService = inject(WorkspaceCategoriesService);
  workspaceUsersService = inject(WorkspaceUsersService);

  workspaceTasksSubscription!: Subscription;
  workspaceCategoriesSubscription!: Subscription;
  workspaceUsersSubscription!: Subscription;

  idWorkspace: number = 0;

  tasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  categories: WritableSignal<Category[]> = signal<Category[]>([]);
  users: WritableSignal<workspaceUsersData[]> = signal<workspaceUsersData[]>(
    []
  );

  ngOnInit(): void {
    if (!this.activatedRoute.parent!.snapshot)
      this.router.navigate(['/']);
    const idWorkspace = parseInt(
      this.activatedRoute.snapshot.paramMap.get('idWorkspace') as any
    );
    if (isNaN(idWorkspace) || !isFinite(idWorkspace) || idWorkspace < 0) {
      this.router.navigate(['/']);
    }
    this.idWorkspace = idWorkspace;

    this.workspaceTasksSubscription =
      this.workspaceTasksService.tasks$.subscribe((tasks) => {
        this.tasks.set(tasks);
        console.log("tasks", tasks);
      });
    this.workspaceCategoriesSubscription =
      this.workspaceCategoriesService.categories$.subscribe((categories) => {
        this.categories.set(categories);
      });
    this.workspaceUsersSubscription =
      this.workspaceUsersService.users$.subscribe((users) => {
        this.users.set(users);
      });
  }

  ngOnDestroy(): void {
    this.workspaceTasksSubscription.unsubscribe();
    this.workspaceCategoriesSubscription.unsubscribe();
    this.workspaceUsersSubscription.unsubscribe();
  }
}

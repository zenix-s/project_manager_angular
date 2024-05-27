import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceCategoriesService } from '@app/core/services/workspace-categories.service';
import { WorkspaceTasksService } from '@app/core/services/workspace-tasks.service';
import { WorkspaceUsersService } from '@app/core/services/workspace-users.service';
import { SectionComponent } from '@app/shared/components/section/section.component';
import { Category, TaskData, workspaceUsersData } from '@env/interface.env';
import { Subject, forkJoin, takeUntil, zip } from 'rxjs';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { SubtaskContainerComponent } from './components/subtask-container/subtask-container.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskFormService } from './components/task-form/task-form.service';
import { FilterTasksService } from './services/filter-tasks.service';
import { DropdownComponent } from '@app/shared/components/dropdown/dropdown/dropdown.component';
import { DropdownListComponent } from '@app/shared/components/dropdown/dropdown-list/dropdown-list.component';
import { DropdownItemComponent } from '@app/shared/components/dropdown/dropdown-item/dropdown-item.component';
import { listPriority } from '@env/interface.env';
import { NewTaskComponent } from './components/new-task/new-task.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    SectionComponent,
    TaskContainerComponent,
    TaskItemComponent,
    SubtaskContainerComponent,
    ModalComponent,
    ButtonComponent,
    TaskFormComponent,
    DropdownComponent,
    DropdownListComponent,
    DropdownItemComponent,
    NewTaskComponent,
  ],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css',
})
export class TasksPageComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  TaskFormService = inject(TaskFormService);
  filterTaskService = inject(FilterTasksService);

  isOpen: boolean = false;
  listPriority = listPriority;

  workspaceTasksService = inject(WorkspaceTasksService);
  workspaceCategoriesService = inject(WorkspaceCategoriesService);
  workspaceUsersService = inject(WorkspaceUsersService);

  private sub = new Subject<void>();

  idWorkspace: number = 0;

  filteredTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  tasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  categories: WritableSignal<Category[]> = signal<Category[]>([]);
  users: WritableSignal<workspaceUsersData[]> = signal<workspaceUsersData[]>(
    []
  );

  filterSearch(event: any) {
    this.filterTaskService.filterSearch(event.target.value, this.tasks());
  }

  ngOnInit(): void {
    let idWorkspace: number;
    this.activatedRoute
      .parent!.paramMap.pipe(takeUntil(this.sub))
      .subscribe((params) => {
        if (!params.has('idWorkspace')) {
          this.router.navigate(['/']);
        }
        idWorkspace = parseInt(params.get('idWorkspace') as any);
        if (isNaN(idWorkspace) || !isFinite(idWorkspace) || idWorkspace < 0) {
          this.router.navigate(['/']);
        }

        this.idWorkspace = idWorkspace;

        this.workspaceTasksService.getTasks(idWorkspace);
        this.workspaceCategoriesService.getWorkspaceCategories(idWorkspace);
        this.workspaceUsersService.getWorkspaceUsers(idWorkspace);
      });

    this.workspaceTasksService.tasks$
      .pipe(takeUntil(this.sub))
      .subscribe((tasks) => {
        this.tasks.set(tasks);
        this.filterTaskService.applyFilters(tasks);
      });

    this.filterTaskService.filteredTasks$
      .pipe(takeUntil(this.sub))
      .subscribe((tasks) => {
        this.filteredTasks.set(tasks);
      });

    this.workspaceCategoriesService.categories$
      .pipe(takeUntil(this.sub))
      .subscribe((categories) => {
        this.categories.set(categories);
      });

    this.workspaceUsersService.users$
      .pipe(takeUntil(this.sub))
      .subscribe((users) => {
        this.users.set(users);
      });
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }
}

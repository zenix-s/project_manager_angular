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
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { SectionComponent } from '@app/shared/components/section/section.component';
import { Category, TaskData, workspaceUsersData } from '@env/interface.env';
import { Subscription } from 'rxjs';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { CategoryFormService } from './components/category-form/category-form.service';
import { CategoryFormComponent } from './components/category-form/category-form.component';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [SectionComponent, CategoryItemComponent, ButtonComponent, CategoryFormComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent implements OnDestroy, OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  toasterService = inject(ToasterService);
  categoryFormService = inject(CategoryFormService)
  workspaceCategoriesService = inject(WorkspaceCategoriesService);

  workspaceCategoriesSubscription!: Subscription;

  idWorkspace: number = 0;

  categories: WritableSignal<Category[]> = signal<Category[]>([]);

  ngOnInit(): void {
    let idWorkspace: number;
    this.activatedRoute.parent!.paramMap.subscribe((params) => {
      if (!params.has('idWorkspace')) {
        this.toasterService.error('No se ha encontrado el espacio de trabajo');
        this.router.navigate(['/']);
      }
      idWorkspace = parseInt(params.get('idWorkspace') as any);
      if (isNaN(idWorkspace) || !isFinite(idWorkspace) || idWorkspace < 0) {
        this.router.navigate(['/']);
      }

      this.idWorkspace = idWorkspace;

      this.workspaceCategoriesService.getWorkspaceCategories(idWorkspace);
    });

    this.workspaceCategoriesSubscription =
      this.workspaceCategoriesService.categories$.subscribe((categories) => {
        this.categories.set(categories);
      });
  }

  ngOnDestroy(): void {
    this.workspaceCategoriesSubscription.unsubscribe();
  }
}

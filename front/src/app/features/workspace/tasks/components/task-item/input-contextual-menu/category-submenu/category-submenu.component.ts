import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Category } from '@app/interfaces/interfaces';
import { CategoryService } from '@app/service/category.service';
import { TaskCategoryService } from '@app/service/task-category.service';

interface CategoryWithSelected {
  Category: Category;
  isSelected: boolean;
}

@Component({
  selector: 'app-category-submenu',
  // templateUrl: './category-submenu.component.html',
  template: `
    <div class="flex w-full relative">
      <div
        class="flex items-center justify-start gap-2 relative hover:bg-lightDark/70 px-2 py-1 w-full"
        (mouseenter)="hovered = true"
        (mouseleave)="hovered = false"
      >
        <span> Categories </span>
      </div>
      <div
        class="absolute bg-dark z-10 border border-fountainBlue w-max right-full"
        [ngClass]="hovered ? 'block' : 'hidden'"
        (mouseenter)="hovered = true"
        (mouseleave)="hovered = false"
      >
        <ul>
          @for (category of categories(); track $index) {
          <li
            class="flex items-center px-2 py-1 gap-2 hover:bg-lightDark/70 cursor-pointer"
            (click)="
              category.isSelected
                ? removeCategory(category.Category.id)
                : addCategory(category.Category.id)
            "
          >
            @if ( category.isSelected ) {
            <app-check-box-icon></app-check-box-icon>
            } @else {
            <app-empty-box-icon></app-empty-box-icon>
            }
            <span
              class="w-3 h-3 rounded-full"
              [style.backgroundColor]="category.Category.color"
            ></span>
            <span>{{ category.Category.name }}</span>
          </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class CategorySubmenuComponent implements OnInit, OnDestroy {
  categoryService = inject(CategoryService);
  taskCategoryService = inject(TaskCategoryService);

  @Input()
  taskCategories: Category[] = [];
  @Input()
  idTask!: number;
  @Input()
  idWorkspace!: number;

  categories: WritableSignal<CategoryWithSelected[]> = signal<
    CategoryWithSelected[]
  >([]);
  hovered = false;

  addCategory(idCategory: number): void {
    this.taskCategoryService.addCategoryToTask(
      {
        idTask: this.idTask,
        idCategory,
      },
      this.idWorkspace
    );
  }
  removeCategory(idCategory: number): void {
    // this.categoryService.removeCategoryFromTask(this.idTask, idCategory);
    this.taskCategoryService.removeCategoryFromTask(
      {
        idTask: this.idTask,
        idCategory,
      },
      this.idWorkspace
    );
  }

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((categories) => {
      this.categories.set(
        categories.map((category) => {
          return {
            Category: category,
            isSelected: this.taskCategories.some(
              (taskCategory) => taskCategory.id === category.id
            ),
          };
        })
      );
      // console.log('categories', this.categories);
    });
    // console.log('taskCategories', this.taskCategories);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}

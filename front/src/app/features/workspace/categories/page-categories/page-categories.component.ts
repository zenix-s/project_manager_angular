import { Component, Input, inject, signal } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';
import { CategoryService } from '@app/service/category.service';

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styles: ``,
})
export class PageCategoriesComponent {

  categoryService = inject(CategoryService);

  @Input()
  idWorkspace!: number;


  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((categories) => {
      this.categories.set(categories);
    });
    this.categoryService.getWorkspaceCategories(this.idWorkspace);
  }
}

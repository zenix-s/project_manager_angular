import { Component, Input, signal } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';
import { CategoryService } from '@app/service/category.service';

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styles: ``,
})
export class PageCategoriesComponent {
  @Input()
  idWorkspace: number;

  constructor(private categoryService: CategoryService) {
    this.idWorkspace = 0;
  }

  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.categoryService
      .getWorkspaceCategories(this.idWorkspace)
      .subscribe((categories) => {
        this.categories.set(categories);
        console.log(categories);
      });
  }
}

import { Component, Input, inject } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';
import { CategoryService } from '@app/service/category.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styles: ``,
})
export class ItemCategoryComponent {
  categoryService = inject(CategoryService);

  @Input()
  category!: Category;

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id);
  }

  editCategory(category: Category) {
    console.log('edit category');
  }
}

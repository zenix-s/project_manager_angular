import { Component, Input, inject } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';
import { CategoryService } from '@app/service/category.service';
import { FormCategoryService } from '../../services/form-category.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styles: ``,
})
export class ItemCategoryComponent {
  categoryService = inject(CategoryService);
  private _formCategoryService = inject(FormCategoryService);

  @Input()
  category!: Category;

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id);
  }

  editCategory() {
    this._formCategoryService.setCategory(this.category);
    this._formCategoryService.open();
  }
}

import { Component, Input } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styles: ``,
})
export class ItemCategoryComponent {
  @Input()
  category!: Category;

  deleteCategory(category: Category) {
    console.log('delete category');
  }

  editCategory(category: Category) {
    console.log('edit category');
  }
}

import { Component, Input, inject } from '@angular/core';
import { WorkspaceCategoriesService } from '@app/core/services/workspace-categories.service';
import { Category } from '@env/interface.env';
import { CategoryFormService } from '../category-form/category-form.service';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.css'
})
export class CategoryItemComponent {
  categoryService = inject(WorkspaceCategoriesService)
  categoryFormService = inject(CategoryFormService)

  @Input() category!: Category;

  deleteCategory() {
    this.categoryService.deleteCategory(this.category.id);
  }

  editCategory() {
    // this.categoryService.editCategory(this.category);
    this.categoryFormService.category = this.category;
    this.categoryFormService.open();
  }
}

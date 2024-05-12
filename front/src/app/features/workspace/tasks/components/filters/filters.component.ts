import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TaskFilterService } from '../../services/task-filter.service';
import { CategoryService } from '@app/service/category.service';
import { Category } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: ``,
})
export class FiltersComponent implements OnInit, OnDestroy {
  TaskFilterService = inject(TaskFilterService);
  CategoryService = inject(CategoryService);

  categories: Category[] = [];

  ngOnInit(): void {
    this.CategoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }
  ngOnDestroy(): void {}
}

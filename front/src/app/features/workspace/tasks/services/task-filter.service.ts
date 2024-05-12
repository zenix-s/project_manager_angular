import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface filter {
  search: string | null;
  category: number[];
  priority: string | null;
  status: boolean;
  subtaskFilter: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskFilterService {
  private _filters = new BehaviorSubject<filter>({
    search: '',
    category: [],
    priority: null,
    status: true,
    subtaskFilter: false,
  });

  filters$ = this._filters.asObservable();

  addCategory(category: number) {
    this._filters.next({
      ...this._filters.value,
      category: [...this._filters.value.category, category],
    });
  }

  removeCategory(category: number) {
    this._filters.next({
      ...this._filters.value,
      category: this._filters.value.category.filter((c) => c !== category),
    });
  }

  toggleCategory(category: number) {
    if (this._filters.value.category.includes(category)) {
      this.removeCategory(category);
    } else {
      this.addCategory(category);
    }
  }

  filterCompleted() {
    this._filters.next({
      ...this._filters.value,
      status: !this._filters.value.status,
    });
  }

  filterSubtasks() {
    this._filters.next({
      ...this._filters.value,
      subtaskFilter: !this._filters.value.subtaskFilter,
    });
  }

  clearFilters() {
    this._filters.next({
      search: '',
      category: [],
      priority: null,
      status: true,
      subtaskFilter: false,
    });
  }
}

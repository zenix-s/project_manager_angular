import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '@app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormCategoryService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  private _category = new BehaviorSubject<Category | null>(null);

  isOpen$ = this._isOpen.asObservable();
  category$ = this._category.asObservable();


  open() {
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
  }

  setCategory(category: Category) {
    this._category.next(category);
  }

  clearCategory() {
    this._category.next(null);
  }


  constructor() { }
}

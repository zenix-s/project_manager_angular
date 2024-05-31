import { Injectable } from '@angular/core';
import { Category } from '@env/interface.env';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryFormService {
  private _isOpen = new BehaviorSubject<boolean>(false);

  private _category = new BehaviorSubject<Category | null>(null);

  isOpen$ = this._isOpen.asObservable();
  category$ = this._category.asObservable();

  isOpened() {
    return this._isOpen.getValue();
  }

  open() {
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
  }

  set category(category: Category | null) {
    this._category.next(category);
  }
}

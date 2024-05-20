import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _isOpen = new BehaviorSubject<boolean>(true);

  isOpen$ = this._isOpen.asObservable();

  toggle() {
    this._isOpen.next(!this._isOpen.value);
  }

  close() {
    this._isOpen.next(false);
  }

  open() {
    this._isOpen.next(true);
  }

}

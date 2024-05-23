import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationFormService {
  private _isOpen = new BehaviorSubject<boolean>(false);


  isOpen$ = this._isOpen.asObservable();

  isOpened() {
    return this._isOpen.getValue();
  }

  open() {
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
  }

}

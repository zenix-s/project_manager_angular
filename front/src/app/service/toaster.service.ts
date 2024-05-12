import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toaster {
  id: number;
  action: string;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private _toaster = new BehaviorSubject<Toaster[]>([]);

  toaster$ = this._toaster.asObservable();

  cleanToaster() {
    this._toaster.next([]);
  }

  generateId() {
    let id = Math.floor(Math.random() * 1000000);
    while (this._toaster.value.find((toast) => toast.id === id)) {
      id = Math.floor(Math.random() * 1000000);
    }

    return id;
  }

  removeToast(id: number) {
    this._toaster.next(this._toaster.value.filter((toast) => toast.id !== id));
  }

  addToast(action: string, message: string, type: 'success' | 'error') {
    const id = this.generateId();
    this._toaster.next([...this._toaster.value, { id, message, type, action }]);
    setTimeout(() => {
      this.removeToast(id);
    }, 3000);
  }
}

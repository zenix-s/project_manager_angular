import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toaster, ToasterType } from '../toaster.entity';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private _toaster = new BehaviorSubject<Toaster[]>([]);

  toaster$ = this._toaster.asObservable();

  generateId(): number {
    let id = Math.floor(Math.random() * 1000);
    while (this._toaster.value.find((toaster) => toaster.id === id)) {
      id = Math.floor(Math.random() * 1000);
    }
    return id;
  }

  cleanToaster(): void {
    this._toaster.next([]);
  }

  removeToast(id: number): void {
    this._toaster.next(
      this._toaster.value.filter((toaster) => toaster.id !== id)
    );
  }

  addToast({
    action,
    message,
    type,
  }: {
    action: string;
    message: string;
    type: ToasterType;
  }): void {
    const id = this.generateId();
    this._toaster.next([...this._toaster.value, { id, action, message, type }]);
    setTimeout(() => {
      this.removeToast(id);
    }, 1500);
  }

  error(message: string): void {
    this.addToast({ action: 'Error', message, type: 'error' });
  }
  success(message: string): void {
    this.addToast({ action: 'Success', message, type: 'success' });
  }
  warning(message: string): void {
    this.addToast({ action: 'Warning', message, type: 'warning' });
  }
  info(message: string): void {
    this.addToast({ action: 'Info', message, type: 'info' });
  }
}

import { Injectable, WritableSignal } from '@angular/core';
import { TaskData } from '@env/interface.env';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskFormService {
  private _isOpen = new BehaviorSubject<boolean>(false);

  private _task = new BehaviorSubject<TaskData | null>(null);

  isOpen$ = this._isOpen.asObservable();
  task$ = this._task.asObservable();

  isOpened() {
    return this._isOpen.getValue();
  }

  open() {
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
  }

  set task(task: TaskData | null) {
    this._task.next(task);
  }
}

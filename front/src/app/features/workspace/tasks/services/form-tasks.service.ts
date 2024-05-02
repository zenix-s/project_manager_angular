import { Injectable } from '@angular/core';
import { TaskData } from '@app/interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormTasksService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  private _task = new BehaviorSubject<TaskData | null>(null);

  isOpen$ = this._isOpen.asObservable();
  task$ = this._task.asObservable();

  open() {
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
  }

  setTask(task: TaskData) {
    this._task.next(task);
  }

  clearTask() {
    this._task.next(null);
  }

  constructor() {}
}

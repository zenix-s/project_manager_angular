import { Injectable } from '@angular/core';
import { Workspace } from '@env/interface.env';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceFormService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  private _workspace = new BehaviorSubject<Workspace | null>(null);

  isOpen$ = this._isOpen.asObservable();
  workspace$ = this._workspace.asObservable();

  isOpened() {
    return this._isOpen.getValue();
  }

  open() {
    this._isOpen.next(true);
  }
  close() {
    this._isOpen.next(false);
  }

  set workspace(workspace: Workspace | null) {
    this._workspace.next(workspace);
  }
}

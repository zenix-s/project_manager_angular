import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, Task, TaskData } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styles: `:host {width: 100%;}`,
})
export class TasksItemComponent {
  @Input()
  task!: TaskData;
  @Input()
  categories: Category[] = [];
  @Input()
  index!: number;
  @Input()
  isLast!: boolean;
  private _hovered = false;
  public get hovered() {
    return this._hovered;
  }
  public set hovered(value) {
    this._hovered = value;
  }

  private _opened = true;
  public get opened() {
    return this._opened;
  }
  public set opened(value) {
    this._opened = value;
  }

  @Output()
  onDeleteTask = new EventEmitter<number>();


  @Output()
  onChangeTask = new EventEmitter<Task>();

  onDelete(id: number) {
    this.onDeleteTask.emit(id);
  }


  onChange(task: Task) {
    this.onChangeTask.emit(task);
  }
}

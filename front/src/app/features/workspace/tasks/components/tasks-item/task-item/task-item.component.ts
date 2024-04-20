import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task, TaskData, TaskWCategories, listPriority, priority } from "@app/interfaces/interfaces";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styles: `:host {
    width: 100%;
  }`,
})
export class TaskItemComponent {
  @Input()
  task!: TaskWCategories;
  @Input()
  index!: number;

  get listPriority() {
    return listPriority;
  }

  @Output()
  onChangeTask = new EventEmitter<Task>();

  ChangePriority(idTask:number, priority: priority) {
    this.task.priority = priority;
    this.onChangeTask.emit(this.task);
  }

  @Output()
  onDeleteTask = new EventEmitter<number>();

  DeleteTask(id: number) {
    this.onDeleteTask.emit(id);
  }

  private _hovered: boolean = false;
  public get hovered(): boolean {
    return this._hovered;
  }
  public set hovered(value: boolean) {
    this._hovered = value;
  }
}

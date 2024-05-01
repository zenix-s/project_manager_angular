import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  Category,
  Task,
  TaskData,
  listPriority,
  priority,
} from '@app/interfaces/interfaces';
import { FormTasksService } from '@app/features/workspace/tasks/services/form-tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  // template: '',
  styles: `:host {
    width: 100%;
  }`,
})
export class TaskItemComponent {

  formTasksService = inject(FormTasksService)

  @Input()
  task!: TaskData;
  @Input()
  categories: Category[] = [];
  @Input()
  index!: number;
  @Input()
  father!: boolean;

  get listPriority() {
    return listPriority;
  }

  @Output()
  onChangeTask = new EventEmitter<Task>();

  ChangePriority(priority: priority) {
    this.task.task.priority = priority;
    this.onChangeTask.emit(this.task.task);
  }

  ChangeCompleteStatusTask(completed: boolean) {
    // this.task.completed = completed;
    this.onChangeTask.emit({
      ...this.task.task,
      completed: completed,
    });
  }

  ChangeDeadlineTask(newDeadline: Date | null) {
    console.log('new deadline: item', newDeadline);
    this.onChangeTask.emit({
      ...this.task.task,
      deadline: newDeadline ? newDeadline : undefined,
    });
  }

  openEditTask() {
    this.formTasksService.open();
    this.formTasksService.setTask(this.task);
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

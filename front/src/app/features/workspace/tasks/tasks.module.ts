import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { TasksItemComponent } from './components/tasks-item/tasks-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { InputSelectPriorityComponent } from './components/task-form/components/input-select-priority/input-select-priority.component';
import { TaskItemComponent } from './components/tasks-item/task-item/task-item.component';
import { SelectPriorityComponent } from './components/tasks-item/task-item/select-priority/select-priority.component';
import { InputCompleteTaskComponent } from './components/tasks-item/task-item/input-complete-task/input-complete-task.component';
import { InputContextualMenuComponent } from './components/tasks-item/task-item/input-contextual-menu/input-contextual-menu.component';
import { PrioritySubmenuComponent } from './components/tasks-item/task-item/input-contextual-menu/priority-submenu/priority-submenu.component';
import { CompletedSubmenuComponent } from './components/tasks-item/task-item/input-contextual-menu/completed-submenu/completed-submenu.component';
import { IconsModule } from '@app/share/icons/icons.module';


@NgModule({
  declarations: [
    TasksPageComponent,
    TasksItemComponent,
    TaskFormComponent,
    InputSelectPriorityComponent,
    TaskItemComponent,
    SelectPriorityComponent,
    InputCompleteTaskComponent,
    InputContextualMenuComponent,
    PrioritySubmenuComponent,
    CompletedSubmenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsModule
  ],
  exports: [
    TasksPageComponent
  ]
})
export class TasksModule { }

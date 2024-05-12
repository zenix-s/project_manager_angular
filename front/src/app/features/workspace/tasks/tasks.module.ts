import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { TasksItemComponent } from './components/tasks-item/tasks-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { InputSelectPriorityComponent } from './components/task-form/components/input-select-priority/input-select-priority.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { SelectPriorityComponent } from './components/task-item/select-priority/select-priority.component';
import { InputCompleteTaskComponent } from './components/task-item/input-complete-task/input-complete-task.component';
import { InputContextualMenuComponent } from './components/task-item/input-contextual-menu/input-contextual-menu.component';
import { PrioritySubmenuComponent } from './components/task-item/input-contextual-menu/priority-submenu/priority-submenu.component';
import { CompletedSubmenuComponent } from './components/task-item/input-contextual-menu/completed-submenu/completed-submenu.component';
import { IconsModule } from '@app/share/icons/icons.module';
import { SubtaskItemComponent } from './components/subtask-item/subtask-item.component';
import { ShareModule } from '@app/share/share.module';
import { DeleteTaskSubmenuComponent } from './components/task-item/input-contextual-menu/delete-task-submenu/delete-task-submenu.component';
import { DeadlineSubmenuComponent } from './components/task-item/input-contextual-menu/deadline-submenu/deadline-submenu.component';
import { CategorySubmenuComponent } from './components/task-item/input-contextual-menu/category-submenu/category-submenu.component';
import { FiltersComponent } from './components/filters/filters.component';


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
    CompletedSubmenuComponent,
    SubtaskItemComponent,
    DeleteTaskSubmenuComponent,
    DeadlineSubmenuComponent,
    CategorySubmenuComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsModule,
    ShareModule
  ],
  exports: [
    TasksPageComponent
  ]
})
export class TasksModule { }

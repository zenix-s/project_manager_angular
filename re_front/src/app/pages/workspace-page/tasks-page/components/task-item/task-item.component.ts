import { Component, Input, inject } from '@angular/core';
import { WorkspaceCategoriesService } from '@app/core/services/workspace-categories.service';
import { DropdownItemComponent } from '@app/shared/components/dropdown/dropdown-item/dropdown-item.component';
import { DropdownListComponent } from '@app/shared/components/dropdown/dropdown-list/dropdown-list.component';
import { DropdownComponent } from '@app/shared/components/dropdown/dropdown/dropdown.component';
import { ToggleComponent } from '@app/shared/components/toggle/toggle.component';
import { TooltipComponent } from '@app/shared/components/tooltip/tooltip.component';
import { Category, TaskData } from '@env/interface.env';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, ToggleComponent, DropdownComponent, DropdownListComponent, DropdownItemComponent, TooltipComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  categoryService = inject(WorkspaceCategoriesService)
  @Input()
  task!: TaskData;

  taskHaveCategory(category:Category){
    return this.task.categories.some(cat => cat.id === category.id)
  }
}

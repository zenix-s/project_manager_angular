import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerIconComponent } from './hamburger-icon/hamburger-icon.component';
import { TrashIconComponent } from './trash-icon/trash-icon.component';
import { NonePriorityIconComponent } from './none-priority-icon/none-priority-icon.component';
import { LowPriorityIconComponent } from './low-priority-icon/low-priority-icon.component';
import { MediumPriorityIconComponent } from './medium-priority-icon/medium-priority-icon.component';
import { HighPriorityIconComponent } from './high-priority-icon/high-priority-icon.component';
import { CriticalPriorityIconComponent } from './critical-priority-icon/critical-priority-icon.component';
import { CircleCheckIconComponent } from './circle-check-icon/circle-check-icon.component';
import { CheckBoxIconComponent } from './check-box-icon/check-box-icon.component';
import { EmptyBoxIconComponent } from './empty-box-icon/empty-box-icon.component';



@NgModule({
  declarations: [
    HamburgerIconComponent,
    TrashIconComponent,
    NonePriorityIconComponent,
    LowPriorityIconComponent,
    MediumPriorityIconComponent,
    HighPriorityIconComponent,
    CriticalPriorityIconComponent,
    CircleCheckIconComponent,
    CheckBoxIconComponent,
    EmptyBoxIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HamburgerIconComponent,
    TrashIconComponent,
    NonePriorityIconComponent,
    LowPriorityIconComponent,
    MediumPriorityIconComponent,
    HighPriorityIconComponent,
    CriticalPriorityIconComponent,
    CircleCheckIconComponent,
    CheckBoxIconComponent,
    EmptyBoxIconComponent
  ]
})
export class IconsModule { }

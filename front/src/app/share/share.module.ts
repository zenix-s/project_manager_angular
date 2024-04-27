import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterLink } from '@angular/router';
import { IconsModule } from './icons/icons.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';



@NgModule({
  declarations: [
    SideBarComponent,
    TooltipComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    IconsModule
  ],
  exports: [
    SideBarComponent,
    TooltipComponent
  ]
})
export class ShareModule { }

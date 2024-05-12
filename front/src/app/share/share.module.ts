import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterLink } from '@angular/router';
import { IconsModule } from './icons/icons.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToasterItemComponent } from './components/toaster-item/toaster-item.component';



@NgModule({
  declarations: [
    SideBarComponent,
    TooltipComponent,
    ToasterComponent,
    ToasterItemComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    IconsModule
  ],
  exports: [
    SideBarComponent,
    TooltipComponent,
    ToasterComponent,
  ]
})
export class ShareModule { }

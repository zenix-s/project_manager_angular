import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterLink } from '@angular/router';
import { IconsModule } from './icons/icons.module';



@NgModule({
  declarations: [
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    IconsModule
  ],
  exports: [
    SideBarComponent,
  ]
})
export class ShareModule { }

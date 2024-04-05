import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule, Route } from '@angular/router';



@NgModule({
  declarations: [
    SideBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SideBarComponent
  ]
})
export class ShareModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTestComponent } from './page-test/page-test.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestCompComponent } from './components/test-comp/test-comp.component';



@NgModule({
  declarations: [
    PageTestComponent,
    CustomInputComponent,
    CustomFormComponent,
    TestCompComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class TestsModule { }

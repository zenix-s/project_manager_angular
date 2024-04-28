import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCategoriesComponent } from './page-categories/page-categories.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { ItemCategoryComponent } from './components/item-category/item-category.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PageCategoriesComponent,
    ListCategoriesComponent,
    ItemCategoryComponent,
    FormCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PageCategoriesComponent
  ]
})
export class CategoriesModule { }

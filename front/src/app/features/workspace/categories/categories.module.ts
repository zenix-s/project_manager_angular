import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCategoriesComponent } from './page-categories/page-categories.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { ItemCategoryComponent } from './components/item-category/item-category.component';



@NgModule({
  declarations: [
    PageCategoriesComponent,
    ListCategoriesComponent,
    ItemCategoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageCategoriesComponent
  ]
})
export class CategoriesModule { }

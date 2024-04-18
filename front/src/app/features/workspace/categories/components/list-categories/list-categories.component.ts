import { Component, Input, input, OnInit, signal } from '@angular/core';
import { Category } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent {

  // @Input()
  // categories: Category[] = [];

  // writable signal

  @Input()
	categories: Category[] = [];

	constructor() { }


}

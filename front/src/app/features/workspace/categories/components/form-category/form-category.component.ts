import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CategoryService } from '@app/service/category.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styles: ``
})
export class FormCategoryComponent {
  private _categoryService = inject(CategoryService);
  private _fb = inject(FormBuilder);

  @Input()
  idWorkspace!: number;

  categoryForm: FormGroup = this._fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: ['', [Validators.maxLength(255), Validators.minLength(3)]],
    color: ['#000000', Validators.required],
  });

  onSubmit(dialog: HTMLDialogElement) {
    if (this.categoryForm.invalid) {
      return;
    }

    this._categoryService.postCategory(this.idWorkspace, this.categoryForm.value);
    this.categoryForm.reset();
    this.closeDialog(dialog);
  }

  openDialog(dialog: HTMLDialogElement) {
    dialog.showModal();
  }

  closeDialog(dialog: HTMLDialogElement) {
    dialog.close();
  }
}

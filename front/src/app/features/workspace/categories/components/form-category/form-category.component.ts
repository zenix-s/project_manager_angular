import { Component, ElementRef, Input, ViewChild, WritableSignal, inject, signal, OnInit, OnDestroy, effect } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CategoryService } from '@app/service/category.service';
import { FormCategoryService } from '@app/features/workspace/categories/services/form-category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styles: ``
})
export class FormCategoryComponent implements OnInit, OnDestroy{
  private _categoryService = inject(CategoryService);
  private _fb = inject(FormBuilder);
  private _formCategoryService = inject(FormCategoryService)

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement> | undefined;

  private _isOpenSubscription!: Subscription;


  @Input()
  idWorkspace!: number;

  isOpen: WritableSignal<boolean> = signal<boolean>(false);

  categoryForm: FormGroup = this._fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: ['', [Validators.maxLength(255), Validators.minLength(3)]],
    color: ['#000000', Validators.required],
  });

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    this._categoryService.postCategory(this.idWorkspace, this.categoryForm.value);
    this.categoryForm.reset();
    this.closeDialog();
  }

  openDialog() {
    this._formCategoryService.open();
  }

  closeDialog() {
    this._formCategoryService.close();
  }

  private _onOpenDialog() {
    if (!this.dialog) return;
    if (this.isOpen() === false) return;
    this.dialog.nativeElement.showModal();
  }

  private _onCloseDialog() {
    if (!this.dialog) return;
    if (this.isOpen() === true) return;
    this.dialog.nativeElement.close();
    this.categoryForm.reset();
    this._formCategoryService.clearCategory();
  }

  constructor() {
    effect(() => {
      if (this.isOpen()){
        this._onOpenDialog();
      } else {
        this._onCloseDialog();
      }
    });
  }

  ngOnInit(): void {
    this._isOpenSubscription = this._formCategoryService.isOpen$.subscribe((isOpen) => {
      this.isOpen.set(isOpen);
    });
  }

  ngOnDestroy(): void {
    this._isOpenSubscription.unsubscribe();
    this._formCategoryService.clearCategory();
    this._formCategoryService.close();
    this.categoryForm.reset();
  }
}

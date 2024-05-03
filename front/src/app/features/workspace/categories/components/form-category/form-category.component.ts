import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  WritableSignal,
  inject,
  signal,
  OnInit,
  OnDestroy,
  effect,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '@app/service/category.service';
import { FormCategoryService } from '@app/features/workspace/categories/services/form-category.service';
import { Subscription } from 'rxjs';
import { Category } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styles: ``,
})
export class FormCategoryComponent implements OnInit, OnDestroy {
  private _categoryService = inject(CategoryService);
  private _fb = inject(FormBuilder);
  private _formCategoryService = inject(FormCategoryService);

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement> | undefined;

  private _isOpenSubscription!: Subscription;
  private _categorySubscription!: Subscription;

  @Input()
  idWorkspace!: number;

  isOpen: WritableSignal<boolean> = signal<boolean>(false);
  category: Category | null = null;

  categoryForm: FormGroup = this._fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: ['', [Validators.maxLength(255), Validators.minLength(3)]],
    color: ['#000000', Validators.required],
    completed: [false],
  });

  onSubmit() {
    // if (this.categoryForm.invalid) {
    //   return;
    // }

    // this._categoryService.postCategory(this.idWorkspace, this.categoryForm.value);
    // this.categoryForm.reset();
    // this.closeDialog();

    if (this.categoryForm.invalid) return;
    const category = this.categoryForm.value;

    if (this.category) {
      // this._categoryService.putCategory(category);
      this._categoryService.putCategory({
        id: this.category!.id,
        idWorkspace: this.category!.idWorkspace,
        ...category,
      });
    } else {
      this._categoryService.postCategory(this.idWorkspace, category);
    }

    this._formCategoryService.close();
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
      if (this.isOpen()) {
        this._onOpenDialog();
      } else {
        this._onCloseDialog();
      }
    });
  }

  ngOnInit(): void {
    this._isOpenSubscription = this._formCategoryService.isOpen$.subscribe(
      (isOpen) => {
        this.isOpen.set(isOpen);
      }
    );
    this._categorySubscription = this._formCategoryService.category$.subscribe(
      (category) => {
        // category ? this.isEdit.set(true) : this.isEdit.set(false);
        this.category = category;
        if (category) {
          this.categoryForm.patchValue({
            name: category.name,
            description: category.description,
            color: category.color,
            completed: category.completed,
          });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._formCategoryService.clearCategory();
    this._formCategoryService.close();
    this.categoryForm.reset();
    this._isOpenSubscription.unsubscribe();
  }
}

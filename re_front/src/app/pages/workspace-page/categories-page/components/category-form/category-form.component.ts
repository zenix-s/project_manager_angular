import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryFormService } from './category-form.service';
import { WorkspaceCategoriesService } from '@app/core/services/workspace-categories.service';
import { Category } from '@env/interface.env';
import { Subscription } from 'rxjs';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ModalComponent, InputComponent, ButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  categoryFormService = inject(CategoryFormService);
  categoryService = inject(WorkspaceCategoriesService);
  toasterService = inject(ToasterService);

  isOpen: WritableSignal<boolean> = signal<boolean>(false);
  category: WritableSignal<Category | null> = signal<Category | null>(null);

  isOpenSub!: Subscription;
  categorySub!: Subscription;

  @Input() idWorkspace: number = 0;

  categoryForm: FormGroup = this.fb.group({
    id: [null],
    name: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: ['', [Validators.maxLength(255), Validators.minLength(3)]],
    color: ['#000000', Validators.required],
    completed: [false],
  });

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.toasterService.error('Category form is invalid');
      return;
    }
    if (this.categoryForm.value.id !== null) {
      this.categoryService.putCategory({
        ...this.categoryForm.value,
        idWorkspace: this.idWorkspace,
      });
    } else {
      this.categoryService.postCategory(
        this.idWorkspace,
        this.categoryForm.value
      );
    }

    this.categoryForm.reset();
    this.categoryFormService.close();
  }

  onClose() {
    this.categoryForm.reset();
    this.categoryFormService.close();
  }

  ngOnInit(): void {
    this.isOpenSub = this.categoryFormService.isOpen$.subscribe((isOpen) => {
      this.isOpen.set(isOpen);
    });

    this.categorySub = this.categoryFormService.category$.subscribe(
      (category) => {
        this.category.set(category);
        if (category) {
          this.categoryForm.patchValue(category);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.isOpenSub.unsubscribe();
    this.categorySub.unsubscribe();

    this.categoryFormService.close();
    this.categoryForm.reset();
  }
}

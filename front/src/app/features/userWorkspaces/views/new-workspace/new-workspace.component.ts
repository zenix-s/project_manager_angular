import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Workspace } from '@types';

interface error {
  required?: string;
  maxlength?: {
    requiredLength: number;
    actualLength: number;
  };
  minlength?: {
    requiredLength: number;
    actualLength: number;
  };
}

@Component({
  selector: 'app-new-workspace',
  templateUrl: './new-workspace.component.html',
})
export class NewWorkspaceComponent {
  constructor(private fb: FormBuilder) {}
  private _loading = false;
  private _errorSaving = false;
  get loading(): boolean {
    return this._loading;
  }
  get errorSaving(): boolean {
    return this._errorSaving;
  }
  workspaceForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.minLength(3)],
    ],
    description: ['', [Validators.maxLength(255), Validators.minLength(3)]],
  });

  get workspace(): Workspace {
    const workspace = this.workspaceForm.value as Workspace;
    return workspace;
  }

  isValidField(field: string): boolean | null {
    return (
      this.workspaceForm.controls[field].errors &&
      this.workspaceForm.controls[field].touched
    );
  }

  getErrorMessage(field: string): string | null {
    if (!this.workspaceForm.controls[field]) {
      return '';
    }

    const errors: error =
      (this.workspaceForm.controls[field].errors as error) || {};

    for (const error in errors) {
      switch (error) {
        case 'required':
          return 'This field is required';
        case 'maxlength':
          return `This field must be less than error ${errors.maxlength?.requiredLength} characters long`;
        case 'minlength':
          return `This field must be more than error ${errors.minlength?.requiredLength} characters long`;
      }
    }
    return '';
  }

  @Output()
  public onCreateWorkspace = new EventEmitter<Workspace>();

  onSubmit(): void {
    this._loading = true;
    setTimeout(() => {
      if (this.workspaceForm.invalid) {
        this.workspaceForm.markAllAsTouched();
        this._loading = false;
        this._errorSaving = true;
        return;
      }
      this._loading = false;
      const workspace = this.workspace;
      this.onCreateWorkspace.emit(workspace);
    }, 2000);
  }
}

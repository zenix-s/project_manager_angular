import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkspaceFormService } from './workspace-form.service';
import { UserWorkspacesService } from '@app/core/services/user-workspaces.service';
import { Workspace } from '@env/interface.env';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { ToasterService } from '@app/core/toaster/service/toaster.service';

@Component({
  selector: 'app-workspace-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, InputComponent, ModalComponent],
  templateUrl: './workspace-form.component.html',
  styleUrl: './workspace-form.component.css',
})
export class WorkspaceFormComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  workspaceFormService = inject(WorkspaceFormService);
  workspaceService = inject(UserWorkspacesService);
  toasterService = inject(ToasterService)

  isOpen: WritableSignal<boolean> = signal<boolean>(false);
  workspace: WritableSignal<Workspace | null> = signal<Workspace | null>(null);

  isOpenSub!: Subscription;
  workspaceSub!: Subscription;

  workspaceForm: FormGroup = this.fb.group({
    id: [null],
    name: [''],
    description: [''],
  });

  onSubmit(): void {
    if (this.workspaceForm.invalid) {
      this.toasterService.warning('Form is invalid');
      return;
    }

    const workspace = this.workspaceForm.value;
    if (workspace.id) {
      // this.workspaceService.
      this.toasterService.success('Workspace updated, not implemented');
    } else {
      this.workspaceService.addWorkspace(workspace);
      this.toasterService.success('Workspace added');
    }
  }

  ngOnInit(): void {
    this.isOpenSub = this.workspaceFormService.isOpen$.subscribe((isOpen) => {
      this.isOpen.set(isOpen);
    });

    this.workspaceSub = this.workspaceFormService.workspace$.subscribe((workspace) => {
      this.workspace.set(workspace);
      if (workspace) {
        this.workspaceForm.patchValue(workspace);
      }

    });
  }

  ngOnDestroy(): void {
    this.isOpenSub.unsubscribe();
    this.workspaceSub.unsubscribe();

    this.workspaceForm.reset();
    this.workspaceFormService.close();
  }
}

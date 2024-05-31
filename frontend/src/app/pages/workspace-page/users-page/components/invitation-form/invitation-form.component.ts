import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { InvitationFormService } from './invitation-form.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { InvitationsService } from '../../../../../core/services/invitations.service';

@Component({
  selector: 'app-invitation-form',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './invitation-form.component.html',
  styleUrl: './invitation-form.component.css',
})
export class InvitationFormComponent {
  InvitationFormService = inject(InvitationFormService);
  fb = inject(FormBuilder);
  toasterService = inject(ToasterService);
  InvitationsService = inject(InvitationsService);

  @Input() idWorkspace: number = 0;

  invitationForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.invitationForm.invalid) {
      this.toasterService.error('Invalid form');
      return;
    }
    // console.log('submit', this.invitationForm.value);
    this.InvitationsService.postInvitation(this.invitationForm.value.email, this.idWorkspace);
    this.InvitationFormService.close();
  }
}

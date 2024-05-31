import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { InvitationsService } from '@app/core/services/invitations.service';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { SectionComponent } from '@app/shared/components/section/section.component';
import { SidebarComponent } from '@app/shared/components/sidebar/sidebar.component';
import { Invitation } from '@env/interface.env';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invitations-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, SectionComponent, ButtonComponent],
  templateUrl: './invitations-page.component.html',
  styleUrl: './invitations-page.component.css'
})
export class InvitationsPageComponent implements OnInit, OnDestroy{
  invitationService = inject(InvitationsService)

  invitations: WritableSignal<Invitation[]> = signal<Invitation[]>([]);
  invSub!:Subscription

  ngOnInit(): void {
    this.invSub = this.invitationService.invitations$.subscribe({
      next: (invitations) => {
        this.invitations.set(invitations);
      }
    });
    this.invitationService.getInvitations();
  }
  ngOnDestroy(): void {
    this.invSub.unsubscribe();
  }
}

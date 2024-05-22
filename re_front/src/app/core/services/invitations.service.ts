import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from '../authentication/service/authentication.service';
import { ToasterService } from '../toaster/service/toaster.service';
import { Invitation } from '@env/interface.env';
import { BehaviorSubject } from 'rxjs';
import { backendUrl, port } from '@env/back.env';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService)
  private toasterService = inject(ToasterService)

  private _invitations = new BehaviorSubject<Invitation[]>([]);

  invitations$ = this._invitations.asObservable();

  clearInvitations() {
    this._invitations.next([]);
  }

  getInvitations() {
    this.http.get(`${backendUrl}:${port}/userInvitations`, {
      headers: {
        Authorization: `${this.authenticationService.userToken}`
      }
    }).subscribe({
      next: (invitations) => {
        this._invitations.next(invitations as Invitation[]);
      },
      error: (error) => {
        this.toasterService.error(error.error.message);
      }
    });
  }

  addInvitation(invitation: Invitation) {
    this._invitations.next([...this._invitations.value, invitation]);
  }

  removeInvitation(invitation: Invitation) {
    this._invitations.next(this._invitations.value.filter((i) => i.id !== invitation.id));
  }

  acceptInvitation(id: number) {
    this.http.put(`${backendUrl}:${port}/invitation/${id}`, {}, {
      headers: {
        Authorization: `${this.authenticationService.userToken}`
      }
    }).subscribe({
      next: () => {
        this.removeInvitation({id} as Invitation);
        this.toasterService.success('Invitation accepted');
      },
      error: (error) => {
        this.toasterService.error(error.error.message);
      }
    });
  }

  rejectInvitation(id: number) {
    this.http.delete(`${backendUrl}:${port}/invitation/${id}`, {
      headers: {
        Authorization: `${this.authenticationService.userToken}`
      }
    }).subscribe({
      next: () => {
        this.removeInvitation({id} as Invitation);
        this.toasterService.success('Invitation rejected');
      },
      error: (error) => {
        this.toasterService.error(error.error.message);
      }
    });
  }

}

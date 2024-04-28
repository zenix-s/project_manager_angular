import { Component, inject } from '@angular/core';
import { AuthenticationService } from '@app/service/authentication.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent {

  authenticationService = inject(AuthenticationService);

  logout() {
    this.authenticationService.logout();
  }

}

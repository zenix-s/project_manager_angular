import { Component, inject } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'front';
  authenticationService = inject(AuthenticationService);

  get isLogged() {
    return this.authenticationService.isLogged;
  }

  logout() {
    this.authenticationService.logout();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from '@app/service/authentication.service';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.css'
})
export class AuthenticationPageComponent implements OnInit{
  authenticationService = inject(AuthenticationService);
  login() {
    this.authenticationService.login('admin', 'admin')
  }


  ngOnInit(): void {
    this.authenticationService.logout();
  }
}

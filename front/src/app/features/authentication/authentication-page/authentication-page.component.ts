import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from '@app/service/authentication.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
      }
    `,
  ],
  imports: [ReactiveFormsModule],
})
export class AuthenticationPageComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  fb = inject(FormBuilder);

  mode = 'login' as 'login' | 'register';

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  resetForm() {
    this.loginForm.reset();
  }

  switchMode(mode: 'login' | 'register') {
    this.authenticationService.setMode(mode);
    this.resetForm();
  }

  login() {
    const { username, password } = this.loginForm.value;
    if (!username || !password) {
      return;
    }
    this.authenticationService.login(username, password);
  }

  register() {
    const { email, username, password } = this.loginForm.value;
    if (!email || !username || !password) {
      return;
    }
    this.authenticationService.register(email, username, password);
  }

  onSubmit() {
    if (this.mode === 'login') {
      this.login();
    } else {
      this.register();
    }
  }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.authenticationService.mode$.subscribe((mode) => {
      this.mode = mode;
    });
  }
}

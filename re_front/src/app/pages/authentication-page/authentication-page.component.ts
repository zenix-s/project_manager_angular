import { Component, OnInit, inject } from '@angular/core';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '@app/core/authentication/service/authentication.service';
import { SectionComponent } from '@app/shared/components/section/section.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';

@Component({
  selector: 'app-authentication-page',
  standalone: true,
  imports: [ReactiveFormsModule, SectionComponent, InputComponent, ButtonComponent],
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.css',
})
export class AuthenticationPageComponent implements OnInit{
  ToasterService = inject(ToasterService);
  fb = inject(FormBuilder);
  // AuthenticationService = inject(AuthenticationService);
  constructor(private authenticationService: AuthenticationService) {}

  mode = 'login' as 'login' | 'register';

  loginForm:FormGroup = this.fb.group({
    email: [''],
    username: [''],
    password: [''],
  });

  resetForm() {
    this.loginForm.reset();
  }

  switchMode(mode: 'login' | 'register') {
    this.mode = mode;
    this.resetForm();

  }

  async onSubmit() {
    const { email, username, password } = this.loginForm.value;
    console.log(this.loginForm.value);
    if (this.mode === 'login') {
      if (!username || !password) {
        this.ToasterService.error('Please fill in all fields');
        return;
      }
      this.authenticationService.login(username, password);
    } else {
      if (!email || !username || !password) {
        this.ToasterService.error('Please fill in all fields');
        return;
      }
      this.authenticationService.register(email, username, password);
    }
  }


  ngOnInit() {
    this.authenticationService.logout();

  }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { backendUrl, port } from '@env/back.env';

interface User {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router = inject(Router);
  http = inject(HttpClient);
  ToasterService = inject(ToasterService);

  private _user: User = {
    id: 0,
    username: '',
    email: '',
  };

  login(username: string, password: string) {
    this.http
      .post(`${backendUrl}:${port}/login`, { username, password })
      .subscribe({
        next: (response: any) => {
          this._user = {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
          };
          localStorage.setItem('token', response.user.id);
					localStorage.setItem('user', JSON.stringify(response.user));
          this.ToasterService.success('Logged in');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.ToasterService.error('Invalid credentials');
        },
      });
  }

  register(email: string, username: string, password: string) {
    this.http
      .post(`${backendUrl}:${port}/register`, { email, username, password })
      .subscribe({
        next: (response: any) => {
          this._user = {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
          };
          localStorage.setItem('token', response.user.id);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.ToasterService.success('Registered');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.ToasterService.error('Invalid credentials');
        },
      });
  }

  logout() {
    this._user = {
      id: 0,
      username: '',
      email: '',
    };
    localStorage.removeItem('token');
		localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }


  get user() {
    if (this._user.id === 0) {
      const user = localStorage.getItem('user');
      if (user) {
        this._user = JSON.parse(user);
      } else {
        this._user = {
          id: 0,
          username: '',
          email: '',
        };
      }
    }
    return this._user;
  }

  isLogged() {
    if (this.user.id !== 0) {
      return true;
    }
    return false;
  }
  get userToken() {
    return localStorage.getItem('token');
  }
}

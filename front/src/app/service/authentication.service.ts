import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { backendUrl, port } from '@env';
import { BehaviorSubject, catchError } from 'rxjs';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router = inject(Router);
  http = inject(HttpClient);
  ToasterService = inject(ToasterService);

  private _mode = new BehaviorSubject<'login' | 'register'>('login');

  mode$ = this._mode.asObservable();

  setMode(mode: 'login' | 'register') {
    this._mode.next(mode);
  }

  private _idUser: number | null = null;
  private _username: string | null = null;

  login(username: string, password: string) {
    this.http
      .post(`${backendUrl}:${port}/login`, { username, password })
      .subscribe({
        next: (res: any) => {
          this._idUser = res.user.id;
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/']);
          this.ToasterService.addToast('Login', 'Sesión iniciada', 'success');
        },
        error: (error) => {
          this.ToasterService.addToast('Error', error.error.message, 'error');
        },
      });
  }

  register(username: string, email: string, password: string) {
    this.http
      .post(`${backendUrl}:${port}/register`, { username, email, password })
      .subscribe({
        next: (res: any) => {
          this._idUser = res.user.id;
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/']);
        },
        error: (error) => {
          // console.log(error);
          // alert(error.error.message);
          this.ToasterService.addToast('Error', error.error.message, 'error');
        },
      });
  }

  logout() {
    this._idUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/authentication']);
    this.ToasterService.addToast('Logout', 'Sesión cerrada', 'success');
  }


  get isLogged() {
    if (this._idUser === null) {
      const user = localStorage.getItem('user');
      if (user) {
        this._idUser = JSON.parse(user).id;
      } else {
        return false;
      }
    }
    return this._idUser !== null;
  }

  get userToken() {
    if (this._idUser === null) {
      const user = localStorage.getItem('user');
      if (user) {
        this._idUser = JSON.parse(user).id;
      } else {
        return '';
      }
    }
    return this._idUser;
  }

  get username() {
    if (this._username === null) {
      const user = localStorage.getItem('user');
      if (user) {
        this._username = JSON.parse(user).username;
      } else {
        return '';
      }
    }
    return this._username;
  }

  constructor() {}
}

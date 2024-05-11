import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { backendUrl, port } from '@env';
import { BehaviorSubject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router = inject(Router);
  http = inject(HttpClient);

  private _mode = new BehaviorSubject<'login' | 'register'>('login');

  mode$ = this._mode.asObservable();

  setMode(mode: 'login' | 'register') {
    this._mode.next(mode);
  }

  private idUser: number | null = null;
  users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      role: 'admin',
    },
    {
      id: 2,
      username: 'user',
      password: 'user',
      role: 'user',
    },
  ];

  login(username: string, password: string) {
    this.http
      .post(`${backendUrl}:${port}/login`, { username, password })
      .subscribe({
        next: (res: any) => {
          this.idUser = res.user.id;
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  register(username: string, email: string, password: string) {
    this.http
      .post(`${backendUrl}:${port}/register`, { username, email, password })
      .subscribe({
        next: (res: any) => {
          this.idUser = res.user.id;
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  logout() {
    this.idUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/authentication']);
  }

  get isLogged() {
    if (this.idUser === null) {
      const user = localStorage.getItem('user');
      if (user) {
        this.idUser = JSON.parse(user).id;
      }
    }
    return this.idUser !== null;
  }

  get userToken() {
    if (this.idUser === null) {
      const user = localStorage.getItem('user');
      if (user) {
        this.idUser = JSON.parse(user).id;
      }
    }
    return this.idUser;
  }

  constructor() {}
}

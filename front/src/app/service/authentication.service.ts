import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  router = inject(Router);
  private idUser:number | null = null;
  users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      role: 'admin'
    },
    {
      id: 2,
      username: 'user',
      password: 'user',
      role: 'user'
    }
  ]

  login(username: string, password: string) {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      this.idUser = user.id;
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.idUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);

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


  constructor() { }
}

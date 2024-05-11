import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  if (!authenticationService.isLogged) {
    router.navigate(['/authentication']);
    return false;
  }
  return true;
};

import { CanActivateFn, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const activatedRoute = inject(ActivatedRoute);
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);


  const isLogged = false;
  if (authenticationService.isLogged()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};

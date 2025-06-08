import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }
  // Redireciona para /auth e mantém a rota de origem para pós-login
  return router.createUrlTree(['/auth'], {
    queryParams: { returnUrl: state.url }
  });
};
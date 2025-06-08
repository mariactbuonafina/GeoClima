import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; // Importe o Guard se já existir

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then(m => m.AuthPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [authGuard] // Remova se não quiser proteger essa rota
  },
 
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then(m => m.FavoritesPage),
    canActivate: [authGuard]
  },

  // Wildcard para rotas não encontradas
  {
    path: '**',
    redirectTo: 'home'
  }
];
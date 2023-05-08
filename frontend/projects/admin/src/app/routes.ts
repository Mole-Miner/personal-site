import { Route } from "@angular/router";
import { authGuard } from 'personal-site-core';

export const appRoutes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canMatch: [ authGuard ],
    loadChildren: () => import('personal-site-ui').then(m => m.shellRoutes)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
] as Route[];

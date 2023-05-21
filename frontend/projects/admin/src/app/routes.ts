import { Route } from "@angular/router";
// import { authGuard } from 'personal-site-core';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    // canMatch: [ authGuard ],
    loadChildren: () => import('./shell/routes').then(m => m.shellRoutes)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
]

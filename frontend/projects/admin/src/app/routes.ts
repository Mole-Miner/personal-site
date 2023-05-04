import { Route } from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import('personal-site-ui').then(m => m.DashboardComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
] as Route[];

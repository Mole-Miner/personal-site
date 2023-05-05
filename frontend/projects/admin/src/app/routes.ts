import { Route } from "@angular/router";

export default [
  {
    path: '',
    canMatch: [],
    loadChildren: () => import('personal-site-ui').then(m => m.ShellModule)
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

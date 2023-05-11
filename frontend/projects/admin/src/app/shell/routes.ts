import { Route } from "@angular/router";
import { provideState } from '@ngrx/store';
import { provideEffects } from "@ngrx/effects";

import { companiesFeature, CompaniesEffects, CompaniesService } from "personal-site-core";

export const shellRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: 'companies',
        providers: [
          provideState(companiesFeature),
          provideEffects(CompaniesEffects),
          CompaniesService
        ],
        loadComponent: () => import('./companies/companies.component').then(m => m.CompaniesComponent)
      },
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'companies'
      }
    ]
  }
];

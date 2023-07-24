import { Route } from "@angular/router";

import { CompaniesService, ExperienceService, ImagesService } from "personal-site-core";

export const shellRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'companies',
        providers: [
          CompaniesService
        ],
        loadComponent: () => import('./companies/companies.component').then(m => m.CompaniesComponent)
      },
      {
        path: 'images',
        providers: [
          ImagesService
        ],
        loadComponent: () => import('./images/images.component').then(m => m.ImagesComponent)
      },
      {
        path: 'experience',
        providers: [
          ExperienceService,
          CompaniesService
        ],
        loadComponent: () => import('./experience/experience.component').then(m => m.ExperienceComponent)
      },
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'about'
      }
    ]
  }
];

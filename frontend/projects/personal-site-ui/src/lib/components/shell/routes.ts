import { Route } from "@angular/router";

import { ShellComponent } from "./shell.component";

export default [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'about',
        loadComponent: () => import('../about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'news',
        loadComponent: () => import('../news/news.component').then(m => m.NewsComponent)
      },
      {
        path: 'experience',
        loadComponent: () => import('../experience/experience.component').then(m => m.ExperienceComponent)
      },
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'about'
      }
    ]
  }
] as Route[];

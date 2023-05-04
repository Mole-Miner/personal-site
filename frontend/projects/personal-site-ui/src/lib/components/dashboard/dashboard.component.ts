import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from "@angular/router";

import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'ui-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}

export const dashboardRoutes = [
  {
    path: '',
    component: DashboardComponent,
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

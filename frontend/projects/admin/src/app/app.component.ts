import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { Actions, ofActionDispatched } from "@ngxs/store";
import { Subject, takeUntil } from "rxjs";

import { ActionAuthLogin, ActionAuthLogout } from "personal-site-core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  standalone: true,
  imports: [ CommonModule, RouterModule ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'admin';

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly actions: Actions, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.onAuthActionLogin();
    this.onAuthActionLogout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onAuthActionLogin(): void {
    this.actions.pipe(
      ofActionDispatched(ActionAuthLogin),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  private onAuthActionLogout(): void {
    this.actions.pipe(
      ofActionDispatched(ActionAuthLogout),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}

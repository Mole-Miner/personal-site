import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterOutlet } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  standalone: true,
  imports: [ CommonModule, RouterOutlet ]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    this.onActionAuthLogin();
    this.onActionAuthLogout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onActionAuthLogin(): void {
    // this.actions.pipe(
    //   ofActionDispatched(ActionAuthLogin),
    //   takeUntil(this.destroy$)
    // ).subscribe(() => {
    //   this.router.navigate(['/']);
    // });
  }

  private onActionAuthLogout(): void {
    // this.actions.pipe(
    //   ofActionDispatched(ActionAuthLogout),
    //   takeUntil(this.destroy$)
    // ).subscribe(() => {
    //   this.router.navigate(['/login']);
    // });
  }
}

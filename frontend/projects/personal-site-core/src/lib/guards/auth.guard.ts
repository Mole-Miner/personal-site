import { CanMatchFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { from, of, switchMap } from "rxjs";

import { AuthState } from "../state";

export const AuthGuard: CanMatchFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.selectOnce(AuthState.isLoggedIn).pipe(
    switchMap(isLoggedIn => {
      if (!isLoggedIn) {
        return from(router.navigate([ 'login' ]));
      }
      return of(true);
    })
  );
}

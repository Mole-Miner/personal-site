import { CanMatchFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngxs/store";

import { AuthState } from "../state";
import { concatMap, from, map, of, switchMap, take, takeLast, tap } from "rxjs";

export const AuthGuard: CanMatchFn = (route, segments) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.selectOnce(AuthState.isLoggedIn).pipe(
    switchMap(isLoggedIn => {
      console.log(isLoggedIn);
      if (!isLoggedIn) {
        return from(router.navigate(['login']));
      }
      return of(true);
    })
  );
}

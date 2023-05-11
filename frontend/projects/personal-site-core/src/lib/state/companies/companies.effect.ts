import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";

import { CompaniesService } from "../../services";
import { CompaniesApiActions, CompaniesPageActions } from "./companies.action";

export namespace CompaniesEffects {
  export const findCompanies = createEffect(
    (actions$ = inject(Actions), companiesService = inject(CompaniesService)) => {
      return actions$.pipe(
        ofType(CompaniesPageActions.findCompanies),
        exhaustMap(() => {
          return companiesService.findCompanies().pipe(
            map(companies => CompaniesApiActions.companiesLoadedSuccess({ companies })),
            catchError((error: { message: string }) => {
              return of(CompaniesApiActions.companiesLoadedFailure({ errorMsg: error.message }));
            })
          )
        })
      )
    },
    { functional: true }
  );
}

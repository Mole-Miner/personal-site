import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";

import { CompaniesService } from "../../services";
import { CompaniesApiActions, CompaniesPageActions } from "./companies.action";

export namespace CompaniesEffects {
  export const findCompanies = createEffect(
    (actions$ = inject(Actions), companiesService = inject(CompaniesService)) => {
      return actions$.pipe(
        ofType(CompaniesPageActions.loadCompanies),
        exhaustMap(() => {
          return companiesService.findCompanies().pipe(
            map(companies => CompaniesApiActions.companiesLoadedSuccess({ payload: companies })),
            catchError((error: { message: string }) => {
              return of(CompaniesApiActions.companiesAPIFailure({ payload: error.message }));
            })
          );
        })
      );
    },
    { functional: true }
  );
  export const createCompany = createEffect(
    (actions$ = inject(Actions), companiesService = inject(CompaniesService)) => {
      return actions$.pipe(
        ofType(CompaniesPageActions.createCompany),
        exhaustMap(({ payload }) => {
          return companiesService.createCompany(payload).pipe(
            map(company => CompaniesApiActions.companyCreatedSuccess({ payload: company })),
            catchError((error: { message: string }) => {
              return of(CompaniesApiActions.companiesAPIFailure({ payload: error.message }));
            })
          );
        })
      );
    },
    { functional: true }
  );
  export const updateCompany = createEffect(
    (actions$ = inject(Actions), companiesService = inject(CompaniesService)) => {
      return actions$.pipe(
        ofType(CompaniesPageActions.updateCompany),
        exhaustMap(({ payload }) => {
          return companiesService.updateCompany(payload).pipe(
            map(company => CompaniesApiActions.companyUpdatedSuccess({ payload: company })),
            catchError((error: { message: string }) => {
              return of(CompaniesApiActions.companiesAPIFailure({ payload: error.message }));
            })
          );
        })
      );
    },
    { functional: true }
  );
  export const deleteCompany = createEffect(
    (actions$ = inject(Actions), companiesService = inject(CompaniesService)) => {
      return actions$.pipe(
        ofType(CompaniesPageActions.deleteCompany),
        exhaustMap(({ payload }) => {
          return companiesService.deleteCompany(payload).pipe(
            map(company => CompaniesApiActions.companyDeletedSuccess({ payload: company })),
            catchError((error: { message: string }) => {
              return of(CompaniesApiActions.companiesAPIFailure({ payload: error.message }));
            })
          );
        })
      );
    },
    { functional: true }
  );
}

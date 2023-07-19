import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";

import { ExperienceService } from "../../services";
import { ExperienceApiActions, ExperiencePageActions } from "./experience.action";

export namespace ExperienceEffects {
  export const findExperienceList = createEffect(
    (actions$ = inject(Actions), experienceService = inject(ExperienceService)) => {
      return actions$.pipe(
        ofType(ExperiencePageActions.loadExperienceList),
        exhaustMap(() => {
          return experienceService.findExperienceList().pipe(
            map(experienceList => ExperienceApiActions.experienceListLoadedSuccess({ payload: experienceList })),
            catchError((error: { message: string }) => {
              return of(ExperienceApiActions.experienceAPIFailure({ payload: error.message }));
            })
          );
        })
      );
    },
    { functional: true }
  );

  export const createExperience = createEffect(
    (actions$ = inject(Actions), experienceService = inject(ExperienceService)) => {
      return actions$.pipe(
        ofType(ExperiencePageActions.createExperience),
        exhaustMap(({ payload }) => {
          return experienceService.createExperience(payload).pipe(
            map(experience => ExperienceApiActions.experienceCreatedSuccess({ payload: experience })),
            catchError((error: { message: string }) => {
              return of(ExperienceApiActions.experienceAPIFailure({ payload: error.message }));
            })
          );
        })
      );
    },
    { functional: true }
  );

  export const updateExperience = createEffect(
    (actions$ = inject(Actions), experienceService = inject(ExperienceService)) => {
      return actions$.pipe(
        ofType(ExperiencePageActions.updateExperience),
        exhaustMap(({ payload }) => {
          return experienceService.updateExperience(payload).pipe(
            map(company => ExperienceApiActions.experienceUpdatedSuccess({ payload: company })),
            catchError((error: { message: string }) => {
              return of(ExperienceApiActions.experienceAPIFailure({ payload: error.message }));
            })
          );
        })
      );
    },
    { functional: true }
  );

  export const deleteExperience = createEffect(
    (actions$ = inject(Actions), experienceService = inject(ExperienceService)) => {
      return actions$.pipe(
        ofType(ExperiencePageActions.deleteExperience),
        exhaustMap(({ payload }) => {
          return experienceService.deleteExperience(payload).pipe(
            map(company => ExperienceApiActions.experienceDeletedSuccess({ payload: company })),
            catchError((error: { message: string }) => {
              return of(ExperienceApiActions.experienceAPIFailure({ payload: error.message }));
            })
          );
        })
      );
    },
    { functional: true }
  );
}

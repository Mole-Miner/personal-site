import { createAction, props } from "@ngrx/store";

import { ExperienceTypes } from "../../types";

export namespace ExperiencePageActions {
  export const loadExperienceList = createAction('[Experience Page] Load Experience List');
  export const createExperience = createAction(
    '[Experience Page] Create Experience',
    props<{ payload: ExperienceTypes.CreateExperience }>()
  );
  export const updateExperience = createAction(
    '[Experience Page] Update Experience',
    props<{ payload: ExperienceTypes.UpdateExperience }>()
  );
  export const deleteExperience = createAction(
    '[Experience Page] Delete Experience',
    props<{ payload: ExperienceTypes.DeleteExperience }>()
  );
}

export namespace ExperienceApiActions {
  export const experienceAPIFailure = createAction(
    '[Experience API] Experience API Failure',
    props<{ payload: string }>()
  );
  export const experienceListLoadedSuccess = createAction(
    '[Experience API] Experience List Loaded Success',
    props<{ payload: ExperienceTypes.Experience[] }>()
  );
  export const experienceCreatedSuccess = createAction(
    '[Experience API] Experience Created Success',
    props<{ payload: ExperienceTypes.Experience }>()
  );
  export const experienceUpdatedSuccess = createAction(
    '[Experience API] Experience Updated Success',
    props<{ payload: ExperienceTypes.Experience }>()
  );
  export const experienceDeletedSuccess = createAction(
    '[Experience API] Experience Deleted Success',
    props<{ payload: ExperienceTypes.Experience }>()
  );
}

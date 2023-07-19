import { createFeature, createFeatureSelector, createReducer, on } from "@ngrx/store";

import { ExperienceTypes } from "../../types";
import { ExperienceApiActions } from './experience.action';

export interface ExperienceState {
  experienceList: ExperienceTypes.Experience[];
  errorMsg: string;
}

const initialState: ExperienceState = {
  experienceList: [],
  errorMsg: ''
}

export const experienceFeatureKey = 'experience';

export const selectExperienceFeature = createFeatureSelector<ExperienceState>(experienceFeatureKey);

export const experienceFeature = createFeature({
  name: experienceFeatureKey,
  reducer: createReducer(
    initialState,
    on(
      ExperienceApiActions.experienceAPIFailure,
      (state, { payload }) => ({ ...state, errorMsg: payload })
    ),
    on(
      ExperienceApiActions.experienceListLoadedSuccess,
      (state, { payload }) => ({ ...state, experienceList: payload })
    ),
    on(
      ExperienceApiActions.experienceCreatedSuccess,
      (state, { payload }) => ({ ...state, experienceList: [ payload, ...state.experienceList ] })
    ),
    on(
      ExperienceApiActions.experienceUpdatedSuccess,
      (state, { payload }) => {
        const experienceList = [ ...state.experienceList ];
        const target = experienceList.find(({ id }) => id === payload.id)!;
        const idx = experienceList.indexOf(target);
        experienceList.splice(idx, 1, payload);
        return { ...state, experienceList };
      }
    ),
    on(
      ExperienceApiActions.experienceDeletedSuccess,
      (state, { payload }) => {
        return { ...state, experienceList: state.experienceList.filter(({ id }) => id !== payload.id) };
      }
    )
  )
});


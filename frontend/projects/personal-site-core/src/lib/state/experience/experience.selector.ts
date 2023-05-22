import { createSelector } from "@ngrx/store";

import { selectExperienceFeature } from "./experience.reducer";

export namespace ExperienceSelectors {
  export const selectExperienceList = createSelector(
    selectExperienceFeature,
    ({ experienceList }) => experienceList
  )
  export const selectErrorMsg = createSelector(
    selectExperienceFeature,
    ({ errorMsg }) => errorMsg
  )
}

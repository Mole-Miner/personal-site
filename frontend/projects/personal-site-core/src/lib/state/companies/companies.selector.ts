import { createSelector } from "@ngrx/store";

import { selectCompaniesFeature } from "./companies.reducer";

export namespace CompaniesSelectors {
  export const selectCompanies = createSelector(
    selectCompaniesFeature,
    ({ companies }) => companies
  )
  export const selectErrorMsg = createSelector(
    selectCompaniesFeature,
    ({ errorMsg }) => errorMsg
  )
}

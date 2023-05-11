import { createAction, props } from "@ngrx/store";

import type { CompaniesTypes } from "../../types";

export namespace CompaniesPageActions {
  export const findCompanies = createAction('[Companies Page] Find Companies');
  export const createCompany = createAction(
    '[Companies Page] Create Company',
    props<CompaniesTypes.CreateCompany>()
  );
  export const updateCompany = createAction(
    '[Companies Page] Update Company',
    props<CompaniesTypes.UpdateCompany>()
  );
  export const deleteCompany = createAction(
    '[Companies Page] Delete Company',
    props<CompaniesTypes.DeleteCompany>()
  )
}

export namespace CompaniesApiActions {
  export const companiesLoadedSuccess = createAction(
    '[Companies API] Companies Loaded Success',
    props<{ companies: CompaniesTypes.Company[] }>()
  );
  export const companiesLoadedFailure = createAction(
    '[Companies API] Companies Loaded Failure',
    props<{ errorMsg: string }>()
  );
}

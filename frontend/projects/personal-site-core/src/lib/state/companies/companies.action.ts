import { createAction, props } from "@ngrx/store";

import type { CompaniesTypes } from "../../types";

export namespace CompaniesPageActions {
  export const loadCompanies = createAction('[Companies Page] Load Companies');
  export const createCompany = createAction(
    '[Companies Page] Create Company',
    props<{ payload: CompaniesTypes.CreateCompany }>()
  );
  export const updateCompany = createAction(
    '[Companies Page] Update Company',
    props<{ payload: CompaniesTypes.UpdateCompany }>()
  );
  export const deleteCompany = createAction(
    '[Companies Page] Delete Company',
    props<{ payload: CompaniesTypes.DeleteCompany }>()
  );
}

export namespace CompaniesApiActions {
  export const companiesAPIFailure = createAction(
    '[Companies API] Companies API Failure',
    props<{ payload: string }>()
  );
  export const companiesLoadedSuccess = createAction(
    '[Companies API] Companies Loaded Success',
    props<{ payload: CompaniesTypes.Company[] }>()
  );
  export const companyCreatedSuccess = createAction(
    '[Companies API] Company Created Success',
    props<{ payload: CompaniesTypes.Company }>()
  );
  export const companyUpdatedSuccess = createAction(
    '[Companies API] Company Updated Success',
    props<{ payload: CompaniesTypes.Company }>()
  );
  export const companyDeletedSuccess = createAction(
    '[Companies API] Company Deleted Success',
    props<{ payload: CompaniesTypes.Company }>()
  );
}

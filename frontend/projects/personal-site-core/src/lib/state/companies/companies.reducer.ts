import { createFeature, createFeatureSelector, createReducer, on } from "@ngrx/store";

import { CompaniesTypes } from "../../types";
import { CompaniesApiActions } from './companies.action';

export interface CompaniesState {
  companies: CompaniesTypes.Company[];
  errorMsg: string;
}

const initialState: CompaniesState = {
  companies: [],
  errorMsg: ''
}

export const companiesFeatureKey = 'companies';

export const selectCompaniesFeature = createFeatureSelector<CompaniesState>(companiesFeatureKey);

export const companiesFeature = createFeature({
  name: companiesFeatureKey,
  reducer: createReducer(
    initialState,
    on(
      CompaniesApiActions.companiesAPIFailure,
      (state, { payload }) => ({ ...state, errorMsg: payload })
    ),
    on(
      CompaniesApiActions.companiesLoadedSuccess,
      (state, { payload }) => ({ ...state, companies: payload })
    ),
    on(
      CompaniesApiActions.companyCreatedSuccess,
      (state, { payload }) => ({ ...state, companies: [ payload, ...state.companies ] })
    ),
    on(
      CompaniesApiActions.companyUpdatedSuccess,
      (state, { payload }) => {
        const companies = [ ...state.companies ];
        const target = companies.find(({ id }) => id === payload.id)!;
        const idx = companies.indexOf(target);
        companies.splice(idx, 1, payload);
        return { ...state, companies };
      }
    ),
    on(
      CompaniesApiActions.companyDeletedSuccess,
      (state, { payload }) => {
        return { ...state, companies: state.companies.filter(({ id }) => id !== payload.id) };
      }
    )
  )
});


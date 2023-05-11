import { createFeature, createFeatureSelector, createReducer, on } from "@ngrx/store";

import { CompaniesTypes } from "../../types";
import { CompaniesApiActions, CompaniesPageActions } from './companies.action';

export interface CompaniesState {
  companies: CompaniesTypes.Company[];
  loading: boolean;
  errorMsg: string;
}

const initialState: CompaniesState = {
  companies: [],
  loading: false,
  errorMsg: ''
}

export const companiesFeatureKey = 'companies';

export const selectCompaniesFeature = createFeatureSelector<CompaniesState>(companiesFeatureKey);

export const companiesFeature = createFeature({
  name: companiesFeatureKey,
  reducer: createReducer(
    initialState,
    on(
      CompaniesPageActions.findCompanies,
      state => ({ ...state, loading: true })),
    on(
      CompaniesApiActions.companiesLoadedSuccess,
      (state, { companies }) => ({ ...state, companies, loading: false })
    ),
    on(
      CompaniesApiActions.companiesLoadedFailure,
      (state, { errorMsg }) => ({ ...state, errorMsg, loading: false })
    )
  )
});


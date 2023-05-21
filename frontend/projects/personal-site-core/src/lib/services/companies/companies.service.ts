import { Injectable } from '@angular/core';

import { RestApiService } from "../rest-api.service";
import { CompaniesTypes } from "../../types";

@Injectable()
export class CompaniesService extends RestApiService {
  constructor() {
    super('companies');
  }

  findCompanies() {
    return this.get<CompaniesTypes.Company[]>();
  }

  findCompanyById({ id }: CompaniesTypes.FindCompanyById) {
    return this.get<CompaniesTypes.Company>(id);
  }

  createCompany(payload: CompaniesTypes.CreateCompany) {
    return this.post<CompaniesTypes.CreateCompany, CompaniesTypes.Company>(payload);
  }

  updateCompany({ id, ...rest }: CompaniesTypes.UpdateCompany) {
    return this.patch<Partial<CompaniesTypes.CreateCompany>, CompaniesTypes.Company>(id, rest);
  }

  deleteCompany({ id }: CompaniesTypes.DeleteCompany) {
    return this.delete<CompaniesTypes.Company>(id);
  }
}

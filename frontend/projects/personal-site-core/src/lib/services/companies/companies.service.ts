import { Injectable } from '@angular/core';

import { RestApiService } from "../rest-api.service";
import { CompaniesTypes } from "../../types";

@Injectable()
export class CompaniesService extends RestApiService<CompaniesTypes.Company> {
  constructor() {
    super('companies');
  }

  findCompanies() {
    return this.findMany();
  }

  findCompany(payload: CompaniesTypes.FindCompany) {
    return this.findOne(payload);
  }

  createCompany(payload: CompaniesTypes.CreateCompany) {
    return this.create(payload);
  }

  updateCompany(payload: CompaniesTypes.UpdateCompany) {
    return this.update(payload);
  }

  deleteCompany(payload: CompaniesTypes.DeleteCompany) {
    return this.delete(payload);
  }
}

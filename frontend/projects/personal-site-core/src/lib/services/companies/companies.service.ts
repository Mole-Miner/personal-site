import { Injectable } from '@angular/core';

import { RestApiService } from "../rest-api.service";
import { Company } from "../../types";

@Injectable()
export class CompaniesService extends RestApiService<Company> {
  constructor() {
    super('companies');
  }

  findCompanies() {
    return this.findMany();
  }

  findCompany(companyId: string){
    return this.findOne({ where: { id: companyId } });
  }

  createCompany(company: Company){
    return this.create({ data: company });
  }

  updateCompany(company: Company) {
    return this.update({ where: { id: company.id }, data: company });
  }

  deleteCompany(companyId: string) {
    return this.delete({ where: { id: companyId } });
  }
}

import { BaseEntity } from "./entity";

export namespace CompaniesTypes {
  export interface Company extends BaseEntity {
    id: string;
    name: string;
    preview: string;
  }

  export interface FindCompanyById {
    id: string;
  }

  export interface CreateCompany {
    name: string;
    preview: string;
  }

  export interface UpdateCompany extends Partial<CreateCompany> {
  }

  export interface UpdateCompany extends FindCompanyById {
  }

  export interface DeleteCompany extends FindCompanyById {
  }
}

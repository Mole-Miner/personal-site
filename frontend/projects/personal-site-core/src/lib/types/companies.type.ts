import { EntityTypes } from "./entity";

export namespace CompaniesTypes {
  export interface Company extends EntityTypes.BaseEntity {
    name: string;
    preview: string;
  }

  export interface FindCompany extends EntityTypes.FindEntity {
  }

  export interface CreateCompany extends EntityTypes.CreateEntity<Company> {
  }

  export interface UpdateCompany extends EntityTypes.UpdateEntity<Company> {
  }

  export interface DeleteCompany extends EntityTypes.DeleteEntity {
  }
}

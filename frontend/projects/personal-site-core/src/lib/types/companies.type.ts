export namespace CompaniesTypes {
  export type Company = {
    id: string;
    name: string;
    preview: string;
  }
  export type FindCompanyById = Pick<Company, 'id'>;
  export type CreateCompany = Omit<Company, 'id'>;
  export type UpdateCompany = Partial<CreateCompany> & FindCompanyById;
  export type DeleteCompany = FindCompanyById;
}

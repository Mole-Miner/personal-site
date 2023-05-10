import { Injectable } from '@nestjs/common';
import { from, Observable } from "rxjs";
import { Company, Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {
  }

  findCompanies(): Observable<Company[]> {
    return from(this.prisma.company.findMany());
  }

  findCompanyById(id: string): Observable<Company> {
    return from(this.prisma.company.findUnique({ where: { id } }));
  }

  createCompany(data: Prisma.CompanyCreateInput): Observable<Company> {
    return from(this.prisma.company.create({ data }));
  }
  
  updateCompany(id: string, data: Prisma.CompanyUpdateWithoutExperiencesInput): Observable<Company> {
    return from(this.prisma.company.update({ where: { id }, data }));
  }

  deleteCompany(id: string): Observable<Company> {
    return from(this.prisma.company.delete({ where: { id } }));
  }
}

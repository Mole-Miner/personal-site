import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { Company, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  public findCompanies(): Observable<Company[]> {
    return from(this.prisma.company.findMany());
  }

  public findCompanyById(id: string): Observable<Company> {
    return from(this.prisma.company.findUnique({ where: { id } }));
  }

  public createCompany(dto: CreateCompanyDto): Observable<string> {
    return from(
      this.prisma.company.create({
        data: { name: dto.name, preview: dto.preview },
      }),
    ).pipe(map((company) => company.id));
  }

  public updateCompany(
    id: string,
    data: Prisma.CompanyUpdateWithoutExperiencesInput,
  ): Observable<string> {
    return from(this.prisma.company.update({ where: { id }, data })).pipe(
      map((company) => company.id),
    );
  }

  public deleteCompany(id: string): Observable<string> {
    return from(this.prisma.company.delete({ where: { id } })).pipe(
      map((company) => company.id),
    );
  }
}

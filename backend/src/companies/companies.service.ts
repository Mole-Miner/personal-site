import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Company } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  public findCompanies(): Observable<Company[]> {
    return from(this.prisma.company.findMany());
  }

  public findCompanyById(id: string): Observable<Company> {
    return from(this.prisma.company.findUnique({ where: { id } }));
  }

  public createCompany(dto: CreateCompanyDto): Observable<Company> {
    return from(
      this.prisma.company.create({
        data: { name: dto.name, preview: dto.preview },
      }),
    );
  }

  public updateCompany(id: string, dto: UpdateCompanyDto): Observable<Company> {
    return from(
      this.prisma.company.update({
        where: { id },
        data: { name: dto.name, preview: dto.preview },
      }),
    );
  }

  public deleteCompany(id: string): Observable<Company> {
    return from(this.prisma.company.delete({ where: { id } }));
  }
}

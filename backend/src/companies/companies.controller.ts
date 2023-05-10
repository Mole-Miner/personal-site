import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from "rxjs";
import { Company } from "@prisma/client";

import { CompaniesService } from "./companies.service";
import { DtoCreateCompany } from "./dto/create-company.dto";
import { DtoUpdateCompany } from "./dto/update-company.dto";

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {
  }

  @Get()
  findCompanies(): Observable<Company[]> {
    return this.companiesService.findCompanies();
  }

  @Get(':id')
  findCompanyById(@Param('id') id: string): Observable<Company> {
    return this.companiesService.findCompanyById(id);
  }

  @Post()
  createCompany(@Body() dto: DtoCreateCompany): Observable<Company> {
    return this.companiesService.createCompany(dto);
  }

  @Patch(':id')
  updateCompany(@Param('id') id: string, dto: DtoUpdateCompany): Observable<Company> {
    return this.companiesService.updateCompany(id, dto);
  }

  @Delete(':id')
  deleteCompany(@Param('id') id: string): Observable<Company> {
    return this.companiesService.deleteCompany(id);
  }
}

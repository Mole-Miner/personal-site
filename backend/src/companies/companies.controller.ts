import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Company } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  public findCompanies(): Observable<Company[]> {
    return this.companiesService.findCompanies();
  }

  @Get(':id')
  public findCompanyById(@Param('id') id: string): Observable<Company> {
    return this.companiesService.findCompanyById(id);
  }

  @Post()
  public createCompany(@Body() dto: CreateCompanyDto): Observable<Company> {
    return this.companiesService.createCompany(dto);
  }

  @Patch(':id')
  public updateCompany(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ): Observable<Company> {
    return this.companiesService.updateCompany(id, dto);
  }

  @Delete(':id')
  public deleteCompany(@Param('id') id: string): Observable<Company> {
    return this.companiesService.deleteCompany(id);
  }
}

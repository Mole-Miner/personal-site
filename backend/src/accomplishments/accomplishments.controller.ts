import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Accomplishment } from '@prisma/client';

import { AccomplishmentsService } from './accomplishments.service';
import { CreateAccomplishmentDto } from './dto/create-accomplishment.dto';
import { UpdateAccomplishmentDto } from './dto/update-accomplishment.dto';

@ApiTags('Accomplishments')
@Controller('accomplishments')
export class AccomplishmentsController {
  constructor(
    private readonly accomplishmentsService: AccomplishmentsService,
  ) {}

  @Get()
  public findAccomplishments(): Observable<Accomplishment[]> {
    return this.accomplishmentsService.findAccomplishments();
  }

  @Get(':id')
  public findAccomplishmentById(
    @Param('id') id: string,
  ): Observable<Accomplishment> {
    return this.accomplishmentsService.findAccomplishmentById(id);
  }

  @Post()
  public createAccomplishment(
    @Body() dto: CreateAccomplishmentDto,
  ): Observable<Accomplishment> {
    return this.accomplishmentsService.createAccomplishment(dto);
  }

  @Patch(':id')
  public updateAccomplishment(
    @Param('id') id: string,
    @Body() dto: UpdateAccomplishmentDto,
  ): Observable<Accomplishment> {
    return this.accomplishmentsService.updateAccomplishment(id, dto);
  }

  @Delete(':id')
  public deleteAccomplishment(@Param('id') id: string): Observable<Accomplishment> {
    return this.accomplishmentsService.deleteAccomplishment(id);
  }
}

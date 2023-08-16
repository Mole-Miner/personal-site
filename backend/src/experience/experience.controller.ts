import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Experience } from '@prisma/client';

import { ExperienceService } from './experience.service';
import {
  CreateExperienceDto,
  CreateExperienceWithPicturesDto,
} from './dto/create-experience.dto';
import { ExperienceQuery } from './experience.query';
import {
  UpdateExperienceDto,
  UpdateExperienceWithPictures,
} from './dto/update-experience.dto';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  public findExperienceList(
    @Query() query: ExperienceQuery,
  ): Observable<Experience[]> {
    return this.experienceService.findExperienceList(query);
  }

  @Get(':id')
  public findExperienceById(
    @Param('id') id: string,
    @Query() query: ExperienceQuery,
  ): Observable<Experience> {
    return this.experienceService.findExperienceById(id, query);
  }

  @Post()
  public createExperience(
    @Body() dto: CreateExperienceDto,
  ): Observable<Experience> {
    return this.experienceService.createExperience(dto);
  }

  @Post('pictures')
  public createExperienceWithPictures(
    @Body() dto: CreateExperienceWithPicturesDto,
  ): Observable<Experience> {
    return this.experienceService.createExperienceWithPictures(dto);
  }

  @Patch(':id')
  public updateExperience(
    @Param('id') id: string,
    @Body() dto: UpdateExperienceDto,
  ): Observable<Experience> {
    return this.experienceService.updateExperience(id, dto);
  }

  @Patch(':id/pictures')
  public updateExperienceWithPictures(
    @Param('id') id: string,
    dto: UpdateExperienceWithPictures,
  ): Observable<Experience> {
    return this.experienceService.updateExperienceWithPictures(id, dto);
  }

  @Delete(':id')
  public deleteExperience(@Param('id') id: string): Observable<Experience> {
    return this.experienceService.deleteExperience(id);
  }
}

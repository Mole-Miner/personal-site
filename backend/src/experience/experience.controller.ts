import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Observable } from "rxjs";
import { Experience } from "@prisma/client";

import { ExperienceService } from "./experience.service";
import { CreateExperienceDto } from "./dto/create-experience.dto";

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {
  }

  @Get()
  findExperienceList(): Observable<Experience[]> {
    return this.experienceService.findExperienceList();
  }

  @Get(':id')
  findExperienceById(@Param('id') id: string): Observable<Experience> {
    return this.experienceService.findExperienceById(id);
  }

  @Post()
  createExperience(@Body() dto: CreateExperienceDto): Observable<Experience> {
    return this.experienceService.createExperience(dto);
  }

  @Delete(':id')
  deleteExperience(@Param('id') id: string): Observable<Experience> {
    return this.experienceService.deleteExperience(id);
  }
}

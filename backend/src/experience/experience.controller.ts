import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from "rxjs";
import { Experience } from "@prisma/client";

import { ExperienceService } from "./experience.service";
import { DtoCreateExperience } from "./dto/create-experience.dto";

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
  createExperience(@Body() dto: DtoCreateExperience): Observable<Experience> {
    return this.experienceService.createExperience(dto);
  }
}

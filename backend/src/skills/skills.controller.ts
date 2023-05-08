import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Skill } from '@prisma/client';
import { Observable } from 'rxjs';

import { SkillsService } from './skills.service';
import { DtoCreatSkill, DtoUpdateSkill } from './dto';
import { AuthGuard } from "../auth/auth.guard";
import { Public } from '../auth/public';

@UseGuards(AuthGuard)
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {
  }

  @Public()
  @Get()
  findSkills(): Observable<Skill[]> {
    return this.skillsService.findSkills();
  }

  @Get(':id')
  findSkill(@Param('id') id: number): Observable<Skill> {
    return this.skillsService.findSkill({ id });
  }

  @Post()
  createSkill(@Body() createSkillDto: DtoCreatSkill): Observable<Skill> {
    return this.skillsService.createSkill(createSkillDto);
  }

  @Patch(':id')
  updateSkill(@Param('id') id: number, @Body() updateSkillDto: DtoUpdateSkill): Observable<Skill> {
    return this.skillsService.updateSkill({ id }, updateSkillDto)
  }

  @Delete(':id')
  deleteSkill(@Param('id') id: number): Observable<Skill> {
    return this.skillsService.deleteSkill({ id });
  }
}

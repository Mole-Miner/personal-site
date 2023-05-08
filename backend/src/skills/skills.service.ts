import { Injectable } from '@nestjs/common';
import { Prisma, Skill } from '@prisma/client';
import { from, Observable } from 'rxjs';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {
  }

  findSkill(where: Prisma.SkillWhereUniqueInput): Observable<Skill> {
    return from(this.prisma.skill.findUnique({ where }));
  }

  findSkills(args?: Prisma.SkillFindManyArgs): Observable<Skill[]> {
    return from(this.prisma.skill.findMany({ ...args }));
  }

  createSkill(data: Prisma.SkillCreateInput): Observable<Skill> {
    return from(this.prisma.skill.create({ data }));
  }

  updateSkill(where: Prisma.SkillWhereUniqueInput, data: Prisma.SkillUpdateInput): Observable<Skill> {
    return from(this.prisma.skill.update({ where, data }));
  }

  deleteSkill(where: Prisma.SkillWhereUniqueInput): Observable<Skill> {
    return from(this.prisma.skill.delete({ where }));
  }
}

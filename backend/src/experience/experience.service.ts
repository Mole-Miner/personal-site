import { Injectable } from '@nestjs/common';
import { exhaustMap, from, Observable } from "rxjs";
import { Experience, Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CreateExperienceDto } from "./dto/create-experience.dto";

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {
  }

  findExperienceList(): Observable<Experience[]> {
    return from(this.prisma.experience.findMany({ include: { company: true } }));
  }

  findExperienceById(id: string): Observable<Experience> {
    return from(this.prisma.experience.findUnique({ where: { id } }));
  }

  createExperience(dto: CreateExperienceDto): Observable<Experience> {
    const { companyId, imageId, ...rest } = dto;
    const createExperience$ = from(this.prisma.experience.create({
      data: {
        ...rest,
        company: { connect: { id: companyId } },
      }
    }));
    return createExperience$.pipe(
      exhaustMap(({ id: experienceId }) => {
        return this.prisma.experience.update({
          where: { id: experienceId },
          data: {
            images: {
              connect: {
                experienceId_imageId: {
                  imageId,
                  experienceId
                }
              }
            }
          }
        });
      })
    );
  }

  updateExperience(id: string, data: Prisma.ExperienceUncheckedUpdateInput): Observable<Experience> {
    return from(this.prisma.experience.update({ where: { id }, data }));
  }

  deleteExperience(id: string): Observable<Experience> {
    return from(this.prisma.experience.delete({ where: { id } }));
  }
}

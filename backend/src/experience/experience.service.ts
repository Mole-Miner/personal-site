import { Injectable } from '@nestjs/common';
import { concatMap, from, map, Observable } from 'rxjs';
import { Experience } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ExperienceQuery } from './experience.query';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  public findExperienceList(query: ExperienceQuery): Observable<Experience[]> {
    return from(
      this.prisma.experience.findMany({
        include: {
          company: query.company,
          accomplishments: query.accomplishments,
          images: query.images,
        },
      }),
    );
  }

  public findExperienceById(
    id: string,
    query: ExperienceQuery,
  ): Observable<Experience> {
    return from(
      this.prisma.experience.findUnique({
        where: { id },
        include: {
          company: query.company,
          accomplishments: query.accomplishments,
          images: query.images,
        },
      }),
    );
  }

  public createExperience(dto: CreateExperienceDto): Observable<string> {
    const { companyId, imageId, ...rest } = dto;
    return from(
      this.prisma.experience.create({
        data: {
          ...rest,
          company: { connect: { id: companyId } },
        },
      }),
    ).pipe(
      concatMap((experience) => {
        return from(
          this.prisma.experience.update({
            where: { id: experience.id },
            data: {
              images: {
                connect: {
                  experienceId_imageId: {
                    imageId,
                    experienceId: experience.id,
                  },
                },
              },
            },
          }),
        );
      }),
      map((experience) => experience.id),
    );
  }

  public updateExperience(
    id: string,
    dto: UpdateExperienceDto,
  ): Observable<string> {
    return from(
      this.prisma.experience.update({
        where: { id },
        data: {
          start: dto.start,
          end: dto.end,
          position: dto.position,
          company: { connect: { id: dto.companyId } },
          images: {
            connect: {
              experienceId_imageId: { experienceId: id, imageId: dto.imageId },
            },
          },
        },
      }),
    ).pipe(map((experience) => experience.id));
  }

  public deleteExperience(id: string): Observable<string> {
    return from(this.prisma.experience.delete({ where: { id } })).pipe(
      map((experience) => experience.id),
    );
  }
}

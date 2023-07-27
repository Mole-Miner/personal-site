import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Experience } from "@prisma/client";

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {
  }

  public createExperience(dto: CreateExperienceDto): Observable<Experience> {
    const { images, ...experienceData } = dto;
    const [ exterior, interior ] = images;
    return from(this.prisma.$transaction(async () => {
      const experience = await this.prisma.experience.create({ data: { ...experienceData } });
      const exteriorImage = await this.prisma.experienceImage.create({
        data: {
          ...exterior,
          experienceId: experience.id
        }
      });
      const interiorImage = await this.prisma.experienceImage.create({
        data: {
          ...interior,
          experienceId: experience.id
        }
      });
      return experience;
    }));
  }

  // public findExperienceList(query: ExperienceQuery): Observable<Experience[]> {
  //   return from(
  //     this.prisma.experience.findMany({
  //       include: {
  //         company: query.company,
  //         accomplishments: query.accomplishments,
  //         images: query.images,
  //       },
  //     }),
  //   );
  // }
  //
  // public findExperienceById(
  //   id: string,
  //   query: ExperienceQuery,
  // ): Observable<Experience> {
  //   return from(
  //     this.prisma.experience.findUnique({
  //       where: { id },
  //       include: {
  //         company: query.company,
  //         accomplishments: query.accomplishments,
  //         images: query.images,
  //       },
  //     }),
  //   );
  // }
  //
  // public createExperience(dto: CreateExperienceDto): Observable<Experience> {
  //   const { companyId, imageId, ...rest } = dto;
  //   return from(
  //     this.prisma.experience.create({
  //       data: {
  //         ...rest,
  //         company: { connect: { id: companyId } },
  //       },
  //     }),
  //   ).pipe(
  //     concatMap((experience) => {
  //       return from(
  //         this.prisma.experience.update({
  //           where: { id: experience.id },
  //           data: {
  //             images: {
  //               connect: {
  //                 experienceId_imageId: {
  //                   imageId,
  //                   experienceId: experience.id,
  //                 },
  //               },
  //             },
  //           },
  //         }),
  //       );
  //     })
  //   );
  // }
  //
  // public updateExperience(
  //   id: string,
  //   dto: UpdateExperienceDto,
  // ): Observable<Experience> {
  //   return from(
  //     this.prisma.experience.update({
  //       where: { id },
  //       data: {
  //         start: dto.start,
  //         end: dto.end,
  //         position: dto.position,
  //         company: { connect: { id: dto.companyId } },
  //         images: {
  //           connect: {
  //             experienceId_imageId: { experienceId: id, imageId: dto.imageId },
  //           },
  //         },
  //       },
  //     }),
  //   );
  // }
  //
  // public deleteExperience(id: string): Observable<Experience> {
  //   return from(this.prisma.experience.delete({ where: { id } }));
  // }
}

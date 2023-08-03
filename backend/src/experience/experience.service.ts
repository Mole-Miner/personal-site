import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Experience } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import {
  CreateExperienceDto,
  CreateExperienceWithPicturesDto,
} from './dto/create-experience.dto';
import {
  UpdateExperienceDto,
  UpdateExperienceWithPictures,
} from './dto/update-experience.dto';
import { ExperienceQuery } from './experience.query';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  public createExperience(dto: CreateExperienceDto): Observable<Experience> {
    return from(
      this.prisma.experience.create({
        data: dto,
      }),
    );
  }

  public createExperienceWithPictures(
    dto: CreateExperienceWithPicturesDto,
  ): Observable<Experience> {
    const { pictures, ...experienceData } = dto;
    return from(
      this.prisma.$transaction(async () => {
        const experience = await this.prisma.experience.create({
          data: experienceData,
        });
        for (const { imageId, ...picture } of pictures) {
          const experiencePicture = await this.prisma.experiencePicture.create({
            data: {
              ...picture,
              experience: { connect: { id: experience.id } },
            },
          });
          await this.prisma.experiencePictureOnImage.create({
            data: {
              imageId,
              experiencePictureId: experiencePicture.id,
            },
          });
        }
        return experience;
      }),
    );
  }

  public updateExperience(
    id: string,
    dto: UpdateExperienceDto,
  ): Observable<Experience> {
    return from(this.prisma.experience.update({ data: dto, where: { id } }));
  }

  public updateExperienceWithPictures(
    id: string,
    dto: UpdateExperienceWithPictures,
  ): Observable<Experience> {
    const { pictures, companyId, ...experienceData } = dto;
    return from(
      this.prisma.$transaction(async () => {
        const experience = await this.prisma.experience.update({
          data: experienceData,
          where: { id },
        });
        for (const { imageId, ...picture } of pictures) {
          const experiencePicture = await this.prisma.experiencePicture.update({
            data: picture,
            where: { id: picture.id },
          });
          await this.prisma.experiencePictureOnImage.update({
            data: {
              imageId,
              experiencePictureId: experiencePicture.id,
            },
            where: {
              experience_picture_image: {
                imageId,
                experiencePictureId: experiencePicture.experienceId,
              },
            },
          });
        }
        return experience;
      }),
    );
  }

  public findExperienceList(query: ExperienceQuery): Observable<Experience[]> {
    return from(
      this.prisma.experience.findMany({
        include: query,
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
        include: query,
      }),
    );
  }

  public deleteExperience(id: string): Observable<Experience> {
    return from(this.prisma.experience.delete({ where: { id } }));
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { from, Observable } from "rxjs";
import { Experience, Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { DtoCreateExperience } from "./dto/create-experience.dto";

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {
  }

  findExperienceList(): Observable<Experience[]> {
    return from(this.prisma.experience.findMany());
  }

  findExperienceById(id: string): Observable<Experience> {
    return from(this.prisma.experience.findUnique({ where: { id } }));
  }

  createExperience(dto: DtoCreateExperience): Observable<Experience> {
    const { image, ...rest } = dto;
    const imgBuffer = Buffer.from(image.data, 'base64url');
    Logger.log(imgBuffer);
    return from(this.prisma.experience.create({
      data: {
        ...rest,
        image: { create: { name: image.name, type: image.type, data: imgBuffer } }
      }
    }));
  }

  updateExperience(id: string, data: Prisma.ExperienceUncheckedUpdateInput): Observable<Experience> {
    return from(this.prisma.experience.update({ where: { id }, data }));
  }

  deleteExperience(id: string): Observable<Experience> {
    return from(this.prisma.experience.delete({ where: { id } }));
  }
}

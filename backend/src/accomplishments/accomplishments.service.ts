import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Accomplishment } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAccomplishmentDto } from './dto/create-accomplishment.dto';
import { UpdateAccomplishmentDto } from './dto/update-accomplishment.dto';

@Injectable()
export class AccomplishmentsService {
  constructor(private readonly prisma: PrismaService) {}

  public findAccomplishments(): Observable<Accomplishment[]> {
    return from(this.prisma.accomplishment.findMany());
  }

  public findAccomplishmentById(id: string): Observable<Accomplishment> {
    return from(this.prisma.accomplishment.findUnique({ where: { id } }));
  }

  public createAccomplishment(
    dto: CreateAccomplishmentDto,
  ): Observable<Accomplishment> {
    return from(
      this.prisma.accomplishment.create({
        data: dto,
      }),
    );
  }

  public updateAccomplishment(
    id: string,
    dto: UpdateAccomplishmentDto,
  ): Observable<Accomplishment> {
    return from(
      this.prisma.accomplishment.update({
        where: { id },
        data: dto,
      }),
    );
  }

  public deleteAccomplishment(id: string): Observable<Accomplishment> {
    return from(this.prisma.accomplishment.delete({ where: { id } }));
  }
}

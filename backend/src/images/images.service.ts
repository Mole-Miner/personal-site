import { Injectable } from '@nestjs/common';
import { Image, Prisma } from '@prisma/client';
import { from, Observable } from 'rxjs';

import { PrismaService } from '../prisma/prisma.service';

export interface Base64UrlImage extends Omit<Image, 'content'> {
  content: string;
}

@Injectable()
export class ImagesService {
  constructor(private readonly prisma: PrismaService) {}

  public downloadImages(): Observable<Image[]> {
    return from(this.prisma.image.findMany());
  }

  public downloadImage(where: Prisma.ImageWhereUniqueInput): Observable<Image> {
    return from(this.prisma.image.findFirst({ where }));
  }

  public uploadImage(data: Prisma.ImageCreateInput): Observable<Image> {
    return from(this.prisma.image.create({ data }));
  }

  public deleteImage(where: Prisma.ImageWhereUniqueInput): Observable<Image> {
    return from(this.prisma.image.delete({ where }));
  }
}

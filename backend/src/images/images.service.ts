import { Injectable } from '@nestjs/common';
import { Image } from '@prisma/client';
import { concatAll, concatMap, from, map, Observable, toArray } from 'rxjs';
import { MultipartFile } from '@fastify/multipart';

import { PrismaService } from '../prisma/prisma.service';
import { bufferToBase64Url } from '../utils/buffer';

export interface Base64UrlImage extends Omit<Image, 'content'> {
  content: string;
}

@Injectable()
export class ImagesService {
  constructor(private readonly prisma: PrismaService) {}

  public findImagesImages(): Observable<Base64UrlImage[]> {
    return from(this.prisma.image.findMany()).pipe(
      concatAll(),
      concatMap((image) => {
        return from(bufferToBase64Url(image.content)).pipe(
          map((base64Url) => ({
            ...image,
            content: `data:${image.type};base64,${base64Url}`,
          })),
        );
      }),
      toArray(),
    );
  }

  public findImageById(id: string): Observable<Base64UrlImage> {
    return from(this.prisma.image.findUnique({ where: { id } })).pipe(
      concatMap((image) =>
        from(bufferToBase64Url(image.content)).pipe(
          map((base64Url) => ({
            ...image,
            content: `data:${image.type};base64,${base64Url}`,
          })),
        ),
      ),
    );
  }

  public createImage(file: MultipartFile): Observable<Image> {
    return from(file.toBuffer()).pipe(
      concatMap((buffer) => {
        return from(
          this.prisma.image.create({
            data: {
              name: file.filename,
              type: file.mimetype,
              content: buffer,
            },
          }),
        );
      }),
    );
  }

  public deleteImage(id: string): Observable<Image> {
    return from(this.prisma.image.delete({ where: { id } }));
  }
}

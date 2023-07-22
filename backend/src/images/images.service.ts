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

  public downloadImages(): Observable<Base64UrlImage[]> {
    return from(this.prisma.image.findMany()).pipe(
      concatAll(),
      concatMap((image) => {
        return from(bufferToBase64Url(image.content)).pipe(
          map((base64Url) => ({ ...image, content: base64Url })),
        );
      }),
      toArray(),
    );
  }

  public downloadImage(id: string): Observable<Base64UrlImage> {
    return from(this.prisma.image.findUnique({ where: { id } })).pipe(
      concatMap((image) =>
        from(bufferToBase64Url(image.content)).pipe(
          map((base64Url) => ({ ...image, content: base64Url })),
        ),
      ),
    );
  }

  public uploadImage(file: MultipartFile): Observable<string> {
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
      map((image) => image.id),
    );
  }

  public deleteImage(id: string): Observable<string> {
    return from(this.prisma.image.delete({ where: { id } })).pipe(
      map((image) => image.id),
    );
  }
}

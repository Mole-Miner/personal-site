import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";
import { concatAll, lastValueFrom, map, Observable, toArray } from "rxjs";

import { Base64UrlImage, ImagesService } from "./images.service";
import { bufferToBase64Url } from '../utils/buffer';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {
  }

  @Get()
  public downloadImages(): Observable<Base64UrlImage[]> {
    return this.imagesService.downloadImages().pipe(
      concatAll(),
      map(image => ({
        ...image,
        content: bufferToBase64Url(image.content)
      })),
      toArray()
    );
  }

  @Get(':id')
  public downloadImage(@Param('id') id: string): Observable<Base64UrlImage> {
    return this.imagesService.downloadImage({ id }).pipe(
      map(image => ({
        ...image,
        content: bufferToBase64Url(image.content)
      }))
    );
  }

  @Post()
  public async uploadImage(@Req() req: FastifyRequest): Promise<null> {
    const file = await req.file();
    await lastValueFrom(this.imagesService.uploadImage({
      name: file.filename,
      type: file.mimetype,
      content: await file.toBuffer()
    }));
    return null;
  }

  @Delete(':id')
  public deleteImage(@Param('id') id: string): Observable<null> {
    return this.imagesService.deleteImage({ id }).pipe(
      map(() => null)
    );
  }
}

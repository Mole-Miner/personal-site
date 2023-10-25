import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { concatMap, from, Observable } from 'rxjs';

import { Base64UrlImage, ImagesService } from './images.service';
import { Image } from '@prisma/client';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  public findImages(): Observable<Base64UrlImage[]> {
    return this.imagesService.findImagesImages();
  }

  @Get(':id')
  public findImageById(@Param('id') id: string): Observable<Base64UrlImage> {
    return this.imagesService.findImageById(id);
  }

  @Post()
  public createImage(@Req() req: FastifyRequest): Observable<Image> {
    return from(req.file()).pipe(
      concatMap((file) => this.imagesService.createImage(file)),
    );
  }

  @Delete(':id')
  public deleteImage(@Param('id') id: string): Observable<Image> {
    return from(this.imagesService.deleteImage(id));
  }
}

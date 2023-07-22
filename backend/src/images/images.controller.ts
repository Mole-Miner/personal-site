import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { concatMap, from, Observable } from 'rxjs';

import { Base64UrlImage, ImagesService } from './images.service';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  public downloadImages(): Observable<Base64UrlImage[]> {
    return this.imagesService.downloadImages();
  }

  @Get(':id')
  public downloadImage(@Param('id') id: string): Observable<Base64UrlImage> {
    return this.imagesService.downloadImage(id);
  }

  @Post()
  public uploadImage(@Req() req: FastifyRequest): Observable<string> {
    return from(req.file()).pipe(
      concatMap((file) => this.imagesService.uploadImage(file)),
    );
  }

  @Delete(':id')
  public deleteImage(@Param('id') id: string): Observable<string> {
    return from(this.imagesService.deleteImage(id));
  }
}

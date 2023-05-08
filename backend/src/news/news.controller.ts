import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { News } from '@prisma/client';

import { NewsService } from './news.service';
import { DtoCreateNews, DtoUpdateNews } from "./dto";
import { AuthGuard } from "../auth/auth.guard";
import { Public } from '../auth/public';

@UseGuards(AuthGuard)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @Public()
  @Get()
  findNewsList(): Observable<News[]> {
    return this.newsService.findNewsList();
  }

  @Get(':id')
  findNews(@Param('id') id: number): Observable<News> {
    return this.newsService.findNews({ id });
  }

  @Post()
  createNews(@Body() createNewsDto: DtoCreateNews): Observable<News> {
    return this.newsService.createNews(createNewsDto);
  }

  @Patch(':id')
  updateNews(@Param('id') id: number, @Body() updateNewsDto: DtoUpdateNews): Observable<News> {
    return this.newsService.updateNews({ id }, updateNewsDto)
  }

  @Delete(':id')
  deleteNews(@Param('id') id: number): Observable<News> {
    return this.newsService.deleteNews({ id });
  }
}

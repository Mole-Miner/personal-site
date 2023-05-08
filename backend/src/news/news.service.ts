import { Injectable } from '@nestjs/common';
import { Prisma, News } from '@prisma/client';
import { from, Observable } from 'rxjs';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {
  }

  findNews(where: Prisma.NewsWhereUniqueInput): Observable<News> {
    return from(this.prisma.news.findUnique({ where }));
  }

  findNewsList(args?: Prisma.NewsFindManyArgs): Observable<News[]> {
    return from(this.prisma.news.findMany({ ...args }));
  }

  createNews(data: Prisma.NewsCreateInput): Observable<News> {
    return from(this.prisma.news.create({ data }));
  }

  updateNews(where: Prisma.NewsWhereUniqueInput, data: Prisma.NewsUpdateInput): Observable<News> {
    return from(this.prisma.news.update({ where, data }));
  }

  deleteNews(where: Prisma.NewsWhereUniqueInput): Observable<News> {
    return from(this.prisma.news.delete({ where }));
  }
}

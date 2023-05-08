import { Injectable } from '@nestjs/common';
import { Job, Prisma } from '@prisma/client';
import { from, Observable } from 'rxjs';

import { PrismaService } from '../prisma/prisma.service';
import { DtoUpdateJob } from './dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  findJob(where: Prisma.JobWhereUniqueInput): Observable<Job> {
    return from(this.prisma.job.findUnique({ where }));
  }

  findJobs(args?: Prisma.JobFindManyArgs): Observable<Job[]> {
    return from(this.prisma.job.findMany({ ...args }));
  }

  createJob(data: Prisma.JobCreateInput): Observable<Job> {
    return from(this.prisma.job.create({ data, include: { responsibilities: true } }));
  }

  updateJob(where: Prisma.JobWhereUniqueInput, { responsibilities, ...rest }: DtoUpdateJob): Observable<[Job, number]> {
    // turn Responsibility[] in the string '(1, 'content a'), (2, 'content b'), ...' where 1 is id and 'content a' is content
    const values = responsibilities.reduce((acc, { id, content }, i, arr) => {
      let pair = `(${ id }, '${ content }'), `;
      // remove ', ' at the end of the last pair
      if (i === arr.length - 1) {
        pair = pair.slice(0, -2);
      }
      return acc.concat(pair);
    }, '');
    return from(this.prisma.$transaction([
      this.prisma.job.update({ where, data: rest }),
      this.prisma.$executeRaw(
        Prisma.sql([ `UPDATE "JobResponsibility" as jr SET content = t.content FROM (VALUES ${values}) AS t (id, content) WHERE t.id = jr.id;` ])
      )
    ]));
  }

  deleteJob(where: Prisma.JobWhereUniqueInput): Observable<Job> {
    return from(this.prisma.job.delete({ where }));
  }
}

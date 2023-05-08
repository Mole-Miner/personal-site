import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Job } from '@prisma/client';

import { JobsService } from './jobs.service';
import { DtoCreateJob, DtoUpdateJob } from "./dto";
import { AuthGuard } from "../auth/auth.guard";
import { Public } from '../auth/public';

@UseGuards(AuthGuard)
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {
  }

  @Public()
  @Get()
  findJobs(): Observable<Job[]> {
    return this.jobsService.findJobs();
  }

  @Get(':id')
  findJob(@Param('id') id: number): Observable<Job> {
    return this.jobsService.findJob({ id });
  }

  @Post()
  createJob(@Body() { responsibilities, ...rest }: DtoCreateJob): Observable<Job> {
    return this.jobsService.createJob({ ...rest, responsibilities: { create: [ ...responsibilities ] } });
  }

  @Patch(':id')
  updateJob(@Param('id') id: number, @Body() updateJobDto: DtoUpdateJob): Observable<Job> {
    return this.jobsService.updateJob({ id }, updateJobDto).pipe(
      map(([job]) => job)
    );
  }

  @Delete(':id')
  deleteJob(@Param('id') id: number): Observable<Job> {
    return this.jobsService.deleteJob({ id });
  }
}

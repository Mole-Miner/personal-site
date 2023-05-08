import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { RestApiService } from "../rest-api.service";
import { CreateJob, Job, UpdateJob } from "../../types/jobs";

@Injectable()
export class JobsService extends RestApiService {
  constructor() {
    super('jobs');
  }

  findJobs(): Observable<Job[]> {
    return this.get<Job[]>();
  }

  findJob(jobId: string): Observable<Job> {
    return this.get<Job>(jobId);
  }

  createJob(newJob: CreateJob): Observable<Job> {
    return this.post<CreateJob, Job>(newJob);
  }

  updateJob(jobId: string, updateJob: UpdateJob): Observable<Job> {
    return this.patch<UpdateJob, Job>(jobId, updateJob);
  }

  deleteJob(jobId: string): Observable<Job> {
    return this.delete<Job>(jobId);
  }
}

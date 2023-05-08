import { Injectable } from "@angular/core";
import { Selector, State } from "@ngxs/store";

import { Job } from "../../types/jobs";

export interface JobsStateModel {
  jobs: Job[] | null;
}

@State<JobsStateModel>({
  name: 'jobs',
  defaults: {
    jobs: null
  }
})
@Injectable()
export class JobsState {
  @Selector()
  static jobs({ jobs }: JobsStateModel): Job[] | null {
    return jobs;
  }
}

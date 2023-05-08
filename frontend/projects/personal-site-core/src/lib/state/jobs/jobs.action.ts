import { CreateJob, UpdateJob } from "../../types/jobs";

export class ActionExperienceFindAll {
  static readonly type = '[Experience] Find All';
}

export class ActionExperienceFindOne {
  static readonly type = '[Experience] Find One';

  constructor(payload: { jobId: string }) {
  }
}

export class ActionExperienceCreate {
  static readonly type = '[Experience] Create';

  constructor(payload: { newJob: CreateJob }) {
  }
}

export class ActionExperienceUpdate {
  static readonly type = '[Experience] Update';

  constructor(payload: { jobId: string, updateJob: UpdateJob }) {
  }
}

export class ActionExperienceDelete {
  static readonly type = '[Experience] Delete';

  constructor(payload: { jobId: string }) {
  }
}

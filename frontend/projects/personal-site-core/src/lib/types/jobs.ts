export interface JobResponsibility {
  content: string;
}

export interface CreateJobResponsibility extends JobResponsibility {}
export interface UpdateJobResponsibility extends CreateJobResponsibility {}

export interface Job {
  title: string;
  company: string;
  periodStart: string;
  periodEnd: string;
  technology: string;
  responsibilities: CreateJobResponsibility[];
}

export interface CreateJob extends Job {}

export interface UpdateJob extends CreateJob {
  responsibilities: UpdateJobResponsibility[];
}

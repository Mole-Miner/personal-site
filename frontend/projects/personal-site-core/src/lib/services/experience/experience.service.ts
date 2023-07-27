import { Injectable } from '@angular/core';

import { AbstractApiService } from "../api.service";
import { Experience, ExperienceQuery } from "../../types";

@Injectable()
export class ExperienceService extends AbstractApiService<Experience> {

  constructor() {
    super('experience');
  }

  findExperienceList(experienceQuery?: ExperienceQuery) {
    const query: ExperienceQuery = {
      accomplishments: false,
      company: false,
      image: false,
      ...experienceQuery
    };
    return this.findMany({ fromObject: query });
  }

  findExperience(experienceId: string, experienceQuery?: ExperienceQuery) {
    const query: ExperienceQuery = {
      accomplishments: false,
      company: false,
      image: false,
      ...experienceQuery
    };
    return this.findOne({ where: { id: experienceId } }, { fromObject: query });
  }

  createExperience(experience: Experience) {
    return this.create({ data: experience });
  }

  updateExperience(experience: Experience) {
    return this.update({ where: { id: experience.id }, data:  experience });
  }

  deleteExperience(experienceId: string) {
    return this.delete({ where: { id: experienceId } });
  }
}

import { Injectable } from '@angular/core';

import { RestApiService } from "../rest-api.service";
import { Experience } from "../../types";

@Injectable()
export class ExperienceService extends RestApiService<Experience> {

  constructor() {
    super('experience');
  }

  findExperienceList() {
    return this.findMany();
  }

  findExperience(experienceId: string) {
    return this.findOne({ where: { id: experienceId } });
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

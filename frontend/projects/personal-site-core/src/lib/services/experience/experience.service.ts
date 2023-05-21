import { Injectable } from '@angular/core';

import { RestApiService } from "../rest-api.service";
import { ExperienceTypes } from "../../types";

@Injectable()
export class ExperienceService extends RestApiService<ExperienceTypes.Experience> {

  constructor() {
    super('experience');
  }

  findExperienceList() {
    return this.findMany();
  }

  findExperience(payload: ExperienceTypes.FindExperience) {
    return this.findOne(payload);
  }

  createExperience(payload: ExperienceTypes.CreateExperience) {
    return this.create(payload);
  }

  updateExperience(payload: ExperienceTypes.UpdateExperience) {
    return this.update(payload);
  }

  deleteExperience(payload: ExperienceTypes.DeleteExperience) {
    return this.delete(payload);
  }
}

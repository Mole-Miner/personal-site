import { Injectable } from '@angular/core';

import { RestApiService } from "../rest-api.service";

@Injectable()
export class SkillsService extends RestApiService {
  constructor() {
    super('skills');
  }
}

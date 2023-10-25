import { Injectable } from '@angular/core';

import { AbstractApiService } from '../api.service';
import { Accomplishment } from "../../types";

@Injectable()
export class AccomplishmentsService extends AbstractApiService<Accomplishment> {
  constructor() {
    super('accomplishments');
  }

  findAccomplishments() {
    return this.findMany();
  }

  findAccomplishment(accomplishmentId: string){
    return this.findOne({ where: { id: accomplishmentId } });
  }

  createAccomplishment(accomplishment: Accomplishment){
    return this.create({ data: accomplishment });
  }

  updateAccomplishment(accomplishment: Accomplishment) {
    return this.update({ where: { id: accomplishment.id }, data: accomplishment });
  }

  deleteAccomplishment(accomplishmentId: string) {
    return this.delete({ where: { id: accomplishmentId } });
  }
}

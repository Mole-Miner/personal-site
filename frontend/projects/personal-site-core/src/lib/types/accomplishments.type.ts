import { EntityTypes } from "./entity.type";

export interface Accomplishment extends EntityTypes.BaseEntity {
  content: string;
  experienceId: string;
}

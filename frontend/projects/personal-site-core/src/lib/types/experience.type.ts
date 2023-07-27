import { EntityTypes } from "./entity.type";

export interface Experience extends EntityTypes.BaseEntity {
  position: string;
  start: string;
  end: string
  companyId: string;
  imageId: string;
}

export interface ExperienceQuery extends EntityTypes.QueryEntity {
  company: boolean;
  accomplishments: boolean;
  image: boolean;
}

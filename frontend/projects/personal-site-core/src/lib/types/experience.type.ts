import { EntityTypes } from "./entity.type";

export interface Experience extends EntityTypes.BaseEntity {
  position: string;
  start: string;
  end: string
  companyId: string;
}

export interface ExperiencePicture extends EntityTypes.BaseEntity {
  side: 'exterior' | 'interior',
  screen: 'mobile' | 'laptop' | 'desktop',
  imageId: string
}

export interface ExperienceWithPictures extends Experience {
  pictures: ExperiencePicture[];
}

export interface ExperienceQuery extends EntityTypes.QueryEntity {
  company: boolean;
  accomplishments: boolean;
  pictures: boolean;
}

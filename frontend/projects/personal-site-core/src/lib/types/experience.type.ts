import { EntityTypes } from "./entity";
import { ImagesTypes } from "./images.type";

export namespace ExperienceTypes {
  export interface Experience extends EntityTypes.BaseEntity {
    position: string;
    start: string;
    end: string
    companyId: string;
    image: ImagesTypes.Image;
  }

  export interface FindExperience extends EntityTypes.FindEntity {
  }

  export interface CreateExperience extends EntityTypes.CreateEntity<Experience> {
  }

  export interface UpdateExperience extends EntityTypes.UpdateEntity<Experience> {
  }

  export interface DeleteExperience extends FindExperience {
  }
}

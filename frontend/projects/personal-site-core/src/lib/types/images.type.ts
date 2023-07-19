import { EntityTypes } from "./entity.type";

export namespace ImagesTypes {
  export interface Image extends EntityTypes.BaseEntity {
    type: string;
    name: string;
    data: ArrayBuffer;
    experienceId?: string;
  }

  export interface FindImage extends EntityTypes.FindEntity {
  }

  export interface CreateImage extends EntityTypes.CreateEntity<Image> {
  }

  export interface UpdateImage extends EntityTypes.UpdateEntity<Image> {
  }

  export interface DeleteImage extends EntityTypes.DeleteEntity {
  }
}

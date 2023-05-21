import { EntityTypes } from "./entity";

export namespace ImagesTypes {
  export interface Image extends EntityTypes.BaseEntity {
    type: string;
    name: string;
    data: ArrayBuffer;
    experienceId: string;
  }
}

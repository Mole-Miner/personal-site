import { EntityTypes } from "./entity.type";
import { Image } from "./images.type";

export interface Experience extends EntityTypes.BaseEntity {
  position: string;
  start: string;
  end: string
  companyId: string;
  image: Image;
}

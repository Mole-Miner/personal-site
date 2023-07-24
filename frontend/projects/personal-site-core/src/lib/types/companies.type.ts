import { EntityTypes } from "./entity.type";

export interface Company extends EntityTypes.BaseEntity {
  name: string;
  preview: string;
}

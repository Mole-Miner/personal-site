import { EntityTypes } from "./entity.type";

export interface Image extends EntityTypes.BaseEntity {
  type: string;
  name: string;
  content: Uint8Array;
  experienceId?: string;
}

export interface Base64UrlImage extends Omit<Image, 'content'> {
  content: string;
}

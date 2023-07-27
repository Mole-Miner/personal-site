export namespace EntityTypes {
  export interface BaseEntity {
    id: string;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
  }

  export type EntityId = Pick<BaseEntity, 'id'>;

  export type PureEntity<T extends BaseEntity = BaseEntity> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

  export type PartialEntity<T extends BaseEntity = BaseEntity> = Partial<PureEntity<T>>;

  export interface QueryEntity {
    [p: string]: string | number | boolean;
  }

  export interface FindEntity {
    where: EntityId;
  }

  export interface CreateEntity<T extends BaseEntity> {
    data: PureEntity<T>;
  }

  export interface UpdateEntity<T extends BaseEntity> extends FindEntity {
    data: PartialEntity<T>;
  }

  export interface DeleteEntity extends FindEntity {
  }
}

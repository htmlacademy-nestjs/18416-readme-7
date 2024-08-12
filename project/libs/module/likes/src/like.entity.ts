import { StorableEntity, Entity, Like } from '@project/shared/core';

export class LikeEntity extends Entity implements StorableEntity<Like> {
  public postId?: string;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(like?: Like) {
    super();
    this.populate(like);
  }

  public populate(like?: Like): void {
    if (!like) {
      return;
    }

    this.id = like.id ?? undefined;
    this.userId = like.userId;
    this.postId = like.postId;
    this.createdAt = like.createdAt ?? undefined;
    this.updatedAt = like.updatedAt ?? undefined;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Like): LikeEntity {
    return new LikeEntity(data);
  }
}

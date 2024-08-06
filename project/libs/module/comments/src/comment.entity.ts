import { Entity } from '@project/shared/core';
import { StorableEntity, Comment } from '@project/shared/core';

export class CommentEntity extends Entity implements StorableEntity<Comment> {
  public text: string;
  public postId?: string;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.text = comment.text;
    this.userId = comment.userId;
    this.postId = comment.postId;
    this.createdAt = comment.createdAt ?? undefined;
    this.updatedAt = comment.updatedAt ?? undefined;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      text: this.text,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Comment): CommentEntity {
    return new CommentEntity(data);
  }
}

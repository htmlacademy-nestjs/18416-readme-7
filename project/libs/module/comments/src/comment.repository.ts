import { Injectable, NotFoundException } from '@nestjs/common';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { Comment } from '@project/shared/core';

import { PrismaClientService } from '@project/blog-models';
import { BasePostgresRepository } from '@project/data-access';

@Injectable()
export class CommentRepository extends BasePostgresRepository<
  CommentEntity,
  Comment
> {
  constructor(
    entityFactory: CommentFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: CommentEntity) {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public async createComment(entity: CommentEntity): Promise<CommentEntity> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<CommentEntity> {
    const comment = await this.client.comment.findFirst({
      where: {
        id,
      },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${comment.id} not found`);
    }
    return this.createEntityFromDocument(comment);
  }

  public async findByPostId(postId: string): Promise<CommentEntity[]> {
    const comments = await this.client.comment.findMany({
      where: {
        postId,
      },
    });

    return comments.map(this.createEntityFromDocument);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async update(entity: CommentEntity): Promise<void> {
    await this.client.comment.update({
      where: { id: entity.id },
      data: {
        text: entity.text,
      },
    });
  }
}

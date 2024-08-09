import { Injectable, NotFoundException } from '@nestjs/common';

import { LikeEntity } from './like.entity';
import { LikeFactory } from './like.factory';
import { Like } from '@project/shared/core';

import { PrismaClientService } from '@project/blog-models';
import { BasePostgresRepository } from '@project/data-access';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(
    entityFactory: LikeFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: LikeEntity): Promise<void> {
    const record = await this.client.like.create({
      data: {
        postId: entity.postId,
        userId: entity.userId,
      },
    });

    entity.id = record.id;
  }

  public async findById(postId: string): Promise<LikeEntity> {
    const like = await this.client.like.findFirst({
      where: {
        postId,
      },
    });
    if (!like) {
      throw new NotFoundException(`Like with id ${like.id} not found`);
    }
    return this.createEntityFromDocument(like);
  }

  public async findByPostId(postId: string): Promise<LikeEntity[]> {
    const likes = await this.client.like.findMany({
      where: {
        postId,
      },
    });

    return likes.map(this.createEntityFromDocument);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.like.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { Comment, PaginationResult } from '@project/shared/core';

import { PrismaClientService } from '@project/blog-models';
import { BasePostgresRepository } from '@project/data-access';
import { CommentQuery } from './comment.query';
import { Prisma } from '@prisma/client';

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

  public async save(entity: CommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: {
        text: entity.text,
        postId: entity.postId,
        userId: entity.userId,
      },
    });
    entity.id = record.id;
  }

  public async getCommentsCount(postId: string): Promise<number> {
    const records = await this.client.comment.count({
      where: {
        postId,
      },
    });

    return records;
  }

  private calculateCommentsPageCount(
    totalCount: number,
    limit: number
  ): number {
    return Math.ceil(totalCount / limit);
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

  public async findByPostId(
    postId: string,
    query?: CommentQuery
  ): Promise<PaginationResult<CommentEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.CommentWhereInput = {};
    const orderBy: Prisma.CommentOrderByWithRelationInput = {};

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, commentCount] = await Promise.all([
      this.client.comment.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getCommentsCount(postId),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument(record as Comment)
      ),
      totalPages: this.calculateCommentsPageCount(commentCount, take),
      totalItems: commentCount,
      currentPage: query?.page,
      itemsPerPage: take,
    };
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

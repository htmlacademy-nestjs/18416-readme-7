import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationResult, Post, PostStatus } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PostQuery } from './post.query';
import { PostType } from '@project/shared/enums';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(
    entityFactory: PostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      },
    });

    entity.id = record.id;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument({
      ...document,
      type: document.type as PostType,
      publicationStatus: document.publicationStatus as PostStatus,
      likes: [],
    });
  }

  public async update(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        postTitle: pojoEntity.postTitle,
        videoLink: pojoEntity.videoLink,
        postAnons: pojoEntity.postAnons,
        postText: pojoEntity.postText,
        quoteText: pojoEntity.quoteText,
        quoteAuthor: pojoEntity.quoteAuthor,
        photo: pojoEntity.photo,
        linkUrl: pojoEntity.linkUrl,
        linkDescription: pojoEntity.linkDescription,
        tags: pojoEntity.tags,
        type: pojoEntity.type,
        publicationStatus: pojoEntity.publicationStatus,
        isPublicationReposted: pojoEntity.isPublicationReposted,
        originalPublicationId: pojoEntity.originalPublicationId,
        originalUserId: pojoEntity.originalUserId,
        likesCount: pojoEntity.likesCount,
        commentsCount: pojoEntity.commentsCount,
      },
      include: {
        comments: true,
        likes: true,
      },
    });
  }

  public async find(
    query?: PostQuery,
    isDraft = false,
    users: string[] = []
  ): Promise<PaginationResult<PostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};
    where.publicationStatus = isDraft ? PostStatus.DRAFT : PostStatus.PUBLISHED;

    if (users?.length > 0) {
      where.userId = {
        in: users,
      };
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    } else if (query.sortByLikes) {
      orderBy.likesCount = query.sortByLikes;
    } else if (query?.sortByComments) {
      orderBy.commentsCount = query.sortByComments;
    }

    if (query?.postTitle) {
      where.postTitle = query?.postTitle;
    }

    if (query?.type) {
      where.type = query.type;
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    if (query?.tag) {
      where.tags = { has: query.tag };
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument({
          ...record,
          type: record.type as PostType,
          publicationStatus: record.publicationStatus as PostStatus,
          likes: [],
        })
      ),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }

  public async findExistedRepost(
    originalPublicationId: string,
    userId: string
  ) {
    const document = await this.client.post.findFirst({
      where: {
        originalPublicationId,
        userId,
        isPublicationReposted: true,
      },
    });

    if (document) {
      throw new ConflictException('Post already reposted');
    }

    return document;
  }

  public async repost(
    existingPost: PostEntity,
    userId: string
  ): Promise<PostEntity> {
    const { id, ...pojoEntity } = existingPost.toPOJO();

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        originalPublicationId: id,
        userId,
        originalUserId: existingPost.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublicationReposted: true,
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      },
    });

    return this.createEntityFromDocument(record as Post);
  }
}

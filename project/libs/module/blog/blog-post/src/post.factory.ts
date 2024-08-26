import { Injectable } from '@nestjs/common';
import { Post, EntityFactory, PostStatus } from '@project/shared/core';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostFactory implements EntityFactory<PostEntity> {
  public create(entityPlainData: Post): PostEntity {
    return new PostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto): PostEntity {
    const entity = new PostEntity();
    entity.originalPublicationId = dto.originalPublicationId;
    entity.originalUserId = dto.originalUserId;
    entity.postTitle = dto.postTitle;
    entity.videoLink = dto.videoLink;
    entity.userId = dto.userId;
    entity.type = dto.type;
    entity.publishedAt = dto.publishedAt;
    entity.publicationStatus = dto.publicationStatus as PostStatus;
    entity.isPublicationReposted = dto.isPublicationReposted;
    entity.publicationRepostNumber = dto.publicationRepostNumber;
    entity.postAnons = dto.postAnons;
    entity.postText = dto.postText;
    entity.quoteText = dto.quoteText;
    entity.quoteAuthor = dto.quoteAuthor;
    entity.photo = dto.photo;
    entity.linkDescription = dto.linkDescription;
    entity.linkUrl = dto.linkUrl;
    entity.likesCount = dto.likesCount;
    entity.commentsCount = dto.commentsCount;
    entity.tags = [];
    entity.comments = [];

    return entity;
  }
}

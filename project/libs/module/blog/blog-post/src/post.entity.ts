import { CommentFactory } from '@project/comments';
import { Entity, Post, StorableEntity, Comment } from '@project/shared/core';
import { PostType, PostStatus } from '@project/shared/enums';

export class PostEntity extends Entity implements StorableEntity<Post> {
  public postTitle: string;
  public videoLink: string;
  public userId: string;
  public type: PostType;
  public createdAt: Date;
  public updatedAt: Date;
  public publishedAt: Date;
  public publicationStatus: PostStatus;
  public isPublicationReposted: boolean;
  public originalPublicationId?: string;
  public originalUserId?: string;
  public publicationRepostNumber?: number;
  public postAnons: string;
  public postText: string;
  public quoteText: string;
  public quoteAuthor: string;
  public photo: string;
  public linkDescription: string;
  public linkUrl: string;
  public tags: string[];
  public likes?: string[];
  public comments: Comment[];

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ? post.id : undefined;
    this.originalPublicationId = post.originalPublicationId
      ? post.originalPublicationId
      : undefined;
    this.originalUserId = post.originalUserId ? post.originalUserId : undefined;
    this.postTitle = post.postTitle ? post.postTitle : undefined;
    this.videoLink = post.videoLink ? post.videoLink : undefined;
    this.userId = post.userId ? post.userId : undefined;
    this.type = post.type ? post.type : undefined;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.publishedAt = post.publishedAt;
    this.publicationStatus = post.publicationStatus;
    this.isPublicationReposted = post.isPublicationReposted
      ? post.isPublicationReposted
      : undefined;
    this.publicationRepostNumber = post.publicationRepostNumber
      ? post.publicationRepostNumber
      : undefined;
    this.postAnons = post.postAnons ? post.postAnons : undefined;
    this.postText = post.postText ? post.postText : undefined;
    this.quoteText = post.quoteText ? post.quoteText : undefined;
    this.quoteAuthor = post.quoteAuthor ? post.quoteAuthor : undefined;
    this.photo = post.photo ? post.photo : undefined;
    this.linkDescription = post.linkDescription
      ? post.linkDescription
      : undefined;
    this.linkUrl = post.linkUrl ? post.linkUrl : undefined;
    this.tags = post.tags ? post.tags : [];
    this.likes = post.likes ? post.likes : [];
    this.comments = post.comments ? post.comments : [];

    const postCommentFactory = new CommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = postCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      originalPublicationId: this.originalPublicationId,
      postTitle: this.postTitle,
      videoLink: this.videoLink,
      userId: this.userId,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishedAt: this.publishedAt,
      publicationStatus: this.publicationStatus,
      isPublicationReposted: this.isPublicationReposted,
      publicationRepostNumber: this.publicationRepostNumber,
      originalUserId: this.originalUserId,
      postAnons: this.postAnons,
      postText: this.postText,
      quoteText: this.quoteText,
      quoteAuthor: this.quoteAuthor,
      photo: this.photo,
      linkDescription: this.linkDescription,
      linkUrl: this.linkUrl,
      tags: this.tags,
      likes: this.likes,
      comments: this.comments?.map((comment) => comment.toPOJO()) ?? [],
    };
  }
}

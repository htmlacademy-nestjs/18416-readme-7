import { Entity } from '../base/entity';
import { PostStatus } from './post-status.enum';
import { PostType } from './post-type.enum';
import { Tag } from './tag.interface';

export interface VideoPost extends Entity {
  id: string;
  originalPublicationId: string;
  name: string;
  videoLink: string;
  userId: string;
  type: PostType.VIDEO;
  creationDate: Date;
  publicationDate: Date;
  publicationStatus: PostStatus;
  publicationRepostNumber: number;
  isPublicationReposted: boolean;
  likesCount: number;
  commentsCount: number;
  tagsList?: Tag[];
}

export interface TextPost extends Entity {
  id: string;
  originalPublicationId: string;
  name: string;
  postAnons: string;
  postText: string;
  userId: string;
  type: PostType.TEXT;
  creationDate: Date;
  publicationDate: Date;
  publicationStatus: PostStatus;
  publicationRepostNumber: number;
  isPublicationReposted: boolean;
  likesCount: number;
  commentsCount: number;
  tagsList?: Tag[];
}

export interface QuotePost extends Entity {
  id: string;
  originalPublicationId: string;
  postText: string;
  postAuthor: string;
  userId: string;
  type: PostType.QUOTE;
  creationDate: Date;
  publicationDate: Date;
  publicationStatus: PostStatus;
  publicationRepostNumber: number;
  isPublicationReposted: boolean;
  likesCount: number;
  commentsCount: number;
  tagsList?: Tag[];
}

export interface PhotoPost extends Entity {
  id: string;
  originalPublicationId: string;
  photo: Blob;
  userId: string;
  type: PostType.PHOTO;
  creationDate: Date;
  publicationDate: Date;
  publicationStatus: PostStatus;
  publicationRepostNumber: number;
  isPublicationReposted: boolean;
  likesCount: number;
  commentsCount: number;
  tagsList?: Tag[];
}

export interface LinkPost extends Entity {
  id: string;
  originalPublicationId: string;
  linkDescription: string;
  linkUrl: string;
  userId: string;
  type: PostType.LINK;
  creationDate: Date;
  publicationDate: Date;
  publicationStatus: PostStatus;
  publicationRepostNumber: number;
  isPublicationReposted: boolean;
  likesCount: number;
  commentsCount: number;
  tagsList?: Tag[];
}

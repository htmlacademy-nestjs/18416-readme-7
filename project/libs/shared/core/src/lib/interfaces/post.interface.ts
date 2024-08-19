import { Entity } from '../base/entity';
import { PostStatus } from '../enums/post-status.enum';
import { PostType } from '../enums/post-type.enum';
import { Comment } from './comment.interface';

export interface Post extends Entity {
  id: string;
  originalPublicationId?: string;
  originalUserId?: string;
  postTitle: string;
  videoLink: string;
  userId: string;
  type: PostType;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  publicationStatus: PostStatus;
  isPublicationReposted?: boolean;
  publicationRepostNumber?: number;
  postAnons: string;
  postText: string;
  quoteText: string;
  quoteAuthor: string;
  photo: string;
  linkDescription: string;
  linkUrl: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
}

import { Entity } from '../base/entity';
import { Like } from './like.interface';
import { PostStatus } from './enums/post-status.enum';
import { PostType } from './enums/post-type.enum';
import { Tag } from './tag.interface';
import { Comment } from './comment.interface';

export interface Post extends Entity {
  id: string;
  originalPublicationId: string;
  name: string;
  videoLink: string;
  userId: string;
  type: PostType;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  publicationStatus: PostStatus;
  isPublicationReposted: boolean;
  publicationRepostNumber: number;
  postAnons: string;
  quoteText: string;
  quoteAuthor: string;
  photo: string;
  linkDescription: string;
  linkUrl: string;
  tags: Tag[];
  likes: Like[];
  comments: Comment[];
}

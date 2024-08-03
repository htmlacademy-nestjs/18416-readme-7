import { Entity } from '../base/entity';

export interface Like extends Entity {
  id: string;
  post: string;
  postId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

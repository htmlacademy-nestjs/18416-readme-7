import { Entity } from '../base/entity';

export interface Like extends Entity {
  postId?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

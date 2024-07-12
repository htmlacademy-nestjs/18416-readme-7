import { Entity } from '../base/entity';

export interface Comment extends Entity {
  id: string;
  text: string;
  postId: string;
  userId: string;
  creationDate: Date;
}

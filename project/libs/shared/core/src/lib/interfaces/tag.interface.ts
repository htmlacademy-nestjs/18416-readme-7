import { Entity } from '../base/entity';

export interface Tag extends Entity {
  id: string;
  tagName: string;
}

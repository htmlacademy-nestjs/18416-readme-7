import { Entity } from '../base/entity';
import { UserRole } from './enums/user-role.enum';

export interface User extends Entity {
  id: string;
  email: string;
  userName: string;
  registerDate: Date;
  userAvatar?: string;
  userPassword: string;
  role: UserRole;
}

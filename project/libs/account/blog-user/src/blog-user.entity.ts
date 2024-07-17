import { Entity } from '@project/shared/core';
import { StorableEntity, AuthUser, UserRole } from '@project/shared/core';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public userName: string;
  public registerDate: Date;
  public userPassword: string;
  public role: UserRole;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.userName = user.userName;
    this.registerDate = user.registerDate;
    this.userPassword = user.userPassword;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      userName: this.userName,
      registerDate: this.registerDate,
      role: this.role,
      passwordHash: this.passwordHash,
      userPassword: this.userPassword,
    };
  }
}

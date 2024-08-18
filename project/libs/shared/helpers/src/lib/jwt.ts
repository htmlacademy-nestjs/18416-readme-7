import { User, TokenPayload } from '@project/shared/core';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    userName: user.userName,
  };
}

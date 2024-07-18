import dayjs from 'dayjs';
import { ConflictException, Injectable } from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { UserRole } from '@project/shared/core';

import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: CreateUserDto) {
    const { email, userName, registerDate, userPassword, passwordHash, role } =
      dto;

    const blogUser = {
      email,
      userName,
      registerDate: dayjs(registerDate).toDate(),
      userPassword: '',
      passwordHash: '',
      role: UserRole.USER,
      avatar: '',
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(
      userPassword
    );

    return this.blogUserRepository.save(userEntity);
  }
}

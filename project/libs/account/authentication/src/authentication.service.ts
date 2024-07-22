import dayjs from 'dayjs';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigType } from '@nestjs/config';

import { dbConfig } from '@project/account-config';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { UserRole } from '@project/shared/core';

import { CreateUserDto } from './dto/create-user.dto';

import { LoginUserDto } from './dto/login-user.dto';

import { AuthenticationResponseStatuses } from './authentication.enum';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, userName, registerDate, userPassword } = dto;

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
      throw new ConflictException(
        AuthenticationResponseStatuses.RESPONSE_USER_EXIST
      );
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(
      userPassword
    );

    this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(
        AuthenticationResponseStatuses.RESPONSE_USER_NOT_FOUND
      );
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(
        AuthenticationResponseStatuses.RESPONSE_WRONG_PASSWORD
      );
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(
        AuthenticationResponseStatuses.RESPONSE_USER_NOT_FOUND
      );
    }

    return user;
  }
}

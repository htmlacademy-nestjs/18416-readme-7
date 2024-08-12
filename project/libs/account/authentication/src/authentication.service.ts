import dayjs from 'dayjs';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService, ConfigType } from '@nestjs/config';

import { dbConfig } from '@project/account-config';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, TokenPayload, User, UserRole } from '@project/shared/core';

import { CreateUserDto } from './dto/create-user.dto';

import { LoginUserDto } from './dto/login-user.dto';

import {
  AuthenticationResponseStatuses,
  AuthenticationValidateMessages,
} from './authentication.enum';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly configService: ConfigService,

    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>,
    private readonly jwtService: JwtService
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, userName, registerDate, userPassword } = dto;

    const blogUser = {
      email,
      userName,
      registerDate: dayjs(registerDate).toDate(),
      userPassword,
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

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      userName: user.userName,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        AuthenticationValidateMessages.TOKEN_CREATION_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

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

import { dbConfig, jwtConfig } from '@project/account-config';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, User, UserRole } from '@project/shared/core';

import { CreateUserDto } from './dto/create-user.dto';

import { LoginUserDto } from './dto/login-user.dto';

import {
  AuthenticationResponseStatuses,
  RefreshTokenParams,
} from './authentication.enum';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/helpers';
import { ApplicationServiceURL } from './authentication.enum';
import { HttpService } from '@nestjs/axios';
import { NotifyService } from '@project/account-notify';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly notifyService: NotifyService,

    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
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
      avatarId: '',
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
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: RefreshTokenParams.REFRESH_TOKEN_SECRET,
          expiresIn: RefreshTokenParams.REFRESH_TOKEN_EXPIRES_IN,
        }
      );

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async changeUserPassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const existUser = await this.blogUserRepository.findById(userId);
    if (!(await existUser.comparePassword(oldPassword))) {
      throw new UnauthorizedException(
        AuthenticationResponseStatuses.RESPONSE_WRONG_PASSWORD
      );
    }

    const userEntity = await new BlogUserEntity(existUser).setPassword(
      newPassword
    );

    this.blogUserRepository.update(userEntity);
  }

  private async getAvatarPath(fileId: string): Promise<string> {
    if (!fileId) {
      return '';
    }

    const data = await this.getAvatar(fileId);

    return `${'statis'}/${data.subDirectory}/${data.hashName}`;
  }

  public async registerWithAvatar(dto: CreateUserDto) {
    const { email, userName, userPassword, avatarId } = dto;

    const blogUser = {
      email,
      userName,
      avatarId,
      registerDate: null,
      subscribers: [],
      passwordHash: '',
      userPassword: '',
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

    await this.notifyService.registerSubscriber({
      id: userEntity.id,
      email: userEntity.email,
      userName: userEntity.userName,
      avatarId: userEntity.avatarId,
    });

    return {
      ...userEntity.toPOJO(),
      avatar: await this.getAvatarPath(userEntity.avatarId),
    };
  }

  public async getAvatar(fileId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.FilesStorage}/${fileId}`
    );

    return data;
  }
}

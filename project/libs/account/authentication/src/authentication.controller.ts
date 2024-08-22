import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogUserEntity } from '@project/blog-user';
import { AuthenticationResponseStatuses } from './authentication.enum';
import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/helpers';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '@project/account-notify';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RequestWithTokenPayload } from '@project/shared/core';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserRdo } from './rdo/user.rdo';
import { IsGuestGuard } from './guards/is-guest.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseStatuses.RESPONSE_CREATED_USER,
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseStatuses.RESPONSE_USER_EXIST,
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AuthenticationResponseStatuses.RESPONSE_SERVER_ERROR,
    type: CreateUserDto,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, userName, avatarId } = newUser;
    await this.notifyService.registerSubscriber({ email, userName, avatarId });
    return newUser.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseStatuses.RESPONSE_VERIFIED_USER,
    type: LoginUserDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseStatuses.RESPONSE_UNAUTHORZED,
    type: LoginUserDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AuthenticationResponseStatuses.RESPONSE_SERVER_ERROR,
    type: LoginUserDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseStatuses.RESPONSE_RETURNS_USER_BY_ID,
    type: BlogUserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseStatuses.RESPONSE_USER_NOT_FOUND,
    type: BlogUserEntity,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AuthenticationResponseStatuses.RESPONSE_SERVER_ERROR,
    type: CreateUserDto,
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/demo/:id')
  public async demoPipe(@Param('id') id: number) {
    console.log(typeof id);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseStatuses.RESPONSE_USER_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseStatuses.RESPONSE_UNAUTHORZED,
  })
  @ApiBody({ type: ChangePasswordDto })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('change-password')
  public async changePassword(
    @Req() { user }: RequestWithUser,
    @Body() { oldPassword, newPassword }: ChangePasswordDto
  ) {
    await this.authService.changeUserPassword(
      user.id,
      oldPassword,
      newPassword
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseStatuses.RESPONSE_CREATED_USER,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseStatuses.RESPONSE_USER_EXIST,
  })
  @UseGuards(IsGuestGuard)
  @Post('register-with-avatar')
  public async createUserWithAvatar(@Body() dto: CreateUserDto) {
    return fillDto(UserRdo, {
      ...(await this.authService.registerWithAvatar(dto)),
    });
  }
}

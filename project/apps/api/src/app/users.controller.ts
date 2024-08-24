import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import 'multer';

import {
  ChangePasswordDto,
  CreateUserDto,
  DetailedUserRdo,
  LoginUserDto,
  UserRdo,
} from '@project/authentication';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationResponseStatuses } from '@project/authentication';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { MongoIdValidationPipe } from '@project/pipes';
import { UsersService } from './users.service';
import { Avatar } from './app.constant';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      createUserDto
    );
    return data;
  }

  @Post('register-with-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async registerWithAvatar(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: Avatar.MaxSize })
        .addFileTypeValidator({ fileType: Avatar.AvailableTypes })
        .build({ fileIsRequired: false })
    )
    avatar?: Express.Multer.File
  ) {
    return this.usersService.registerWithAvatar(createUserDto, avatar);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseStatuses.PASSWORD_IS_CHANGED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseStatuses.RESPONSE_USER_NOT_FOUND,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('password')
  public async changePassword(
    @Body() dto: ChangePasswordDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/password`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @ApiResponse({
    type: DetailedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseStatuses.RESPONSE_USER_EXIST,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseStatuses.RESPONSE_USER_NOT_FOUND,
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${id}`
    );
    const { data: dataCount } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}/${id}/count`
    );

    return {
      ...data,
      postsCount: dataCount,
    };
  }
}

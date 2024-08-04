import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogUserEntity } from '@project/blog-user';
import { AuthenticationResponseStatuses } from './authentication.enum';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

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
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return verifiedUser.toPOJO();
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
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }
  @Get('/demo/:id')
  public async demoPipe(@Param('id') id: number) {
    console.log(typeof id);
  }
}

import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { ApplicationServiceURL } from './app.config';
import { CreateLikeDto, LikeRdo } from '@project/blog-like';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { postResponseMessages } from '@project/blog-post';

@ApiTags('likes')
@Controller('likes')
@UseFilters(AxiosExceptionFilter)
export class LikeController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: postResponseMessages.LIKE_ALREADY_EXISTS,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: postResponseMessages.POST_IS_NOT_PUBLISHED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: postResponseMessages.USER_NOT_AUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post(`:postId`)
  public async createLike(
    @Param('postId') postId: string,
    @Body() dto: CreateLikeDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/${postId}/likes`,
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
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: postResponseMessages.POST_LIKE_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: postResponseMessages.USER_NOT_AUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete(`:postId`)
  public async deleteLike(
    @Param('postId') postId: string,
    @Body() dto: CreateLikeDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${postId}/likes`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
        data: dto,
      }
    );

    return data;
  }
}

import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from './guards/check-auth.guard';
import {
  CommentQuery,
  CommentRdo,
  CommentWithPaginationRdo,
  CreateCommentDto,
  DeleteCommentDto,
} from '@project/comments';
import { ApplicationServiceURL } from './app.config';
import { AppResponseMessage } from '@project/shared/core';
import { InjectUserIdInterceptor } from '@project/interceptors';

@ApiTags('comments')
@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AppResponseMessage.UNAUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post(':postId')
  public async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post<CommentRdo>(
      `${ApplicationServiceURL.Blog}/${postId}/comments`,
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
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':postId')
  public async getComment(
    @Param('postId') postId: string,
    @Query() query: CommentQuery
  ) {
    const { data } =
      await this.httpService.axiosRef.get<CommentWithPaginationRdo>(
        `${ApplicationServiceURL.Blog}/${postId}/comments`,
        {
          params: query,
        }
      );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AppResponseMessage.UNAUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':postId')
  public async deleteComment(
    @Param('postId') postId: string,
    @Body() dto: DeleteCommentDto,
    @Req() req: Request
  ) {
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${postId}/comments`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
        data: dto,
      }
    );
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get('/find')
  public async getCommentsByPostId(
    @Param('postId') postId: string,
    @Query() params: any
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}/${postId}/comments/find`,
      { params }
    );
    return data;
  }
}

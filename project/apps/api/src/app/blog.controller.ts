import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AddNewPostDto } from './dto/add-new-post.dto';
import { ApplicationServiceURL } from './app.config';
import { ApiResponse } from '@nestjs/swagger';
import { CreateRepostDto, PostRdo } from '@project/blog-post';
import { PostQuery } from '@project/blog-post';
import { postMessages } from '@project/blog-post';
import { AppResponseMessage } from '@project/shared/core';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { UpdatePostDto } from '@project/blog-post';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseInterceptors)
  @Post('/')
  public async create(@Body() dto: AddNewPostDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/`,
      dto
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: postMessages.POST_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AppResponseMessage.INTERNAL_ERROR,
  })
  @Get()
  public async getAllPosts(@Query() query: PostQuery) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}/`,
      {
        params: query,
      }
    );
    return data;
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get('/:id')
  public async getPost(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get<PostRdo>(
      `${ApplicationServiceURL.Blog}/${id}`
    );
    return data;
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Blog}/${id}`,
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
    status: HttpStatus.NOT_FOUND,
    description: postMessages.POST_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AppResponseMessage.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deletePost(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post(`repost/:postId`)
  public async createRepost(
    @Param('postId') postId: string,
    @Body() dto: CreateRepostDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/repost/${postId}`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }
}

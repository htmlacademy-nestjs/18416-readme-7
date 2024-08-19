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
  UseGuards,
} from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';
import { PostQuery } from './post.query';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CommentRdo, CreateCommentDto } from '@project/comments';
import { ApiResponse } from '@nestjs/swagger';
import { postMessages } from './post.constant';
import { JwtAuthGuard } from '@project/authentication';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    type: PostWithPaginationRdo,
    status: HttpStatus.OK,
    description: postMessages.POST_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: postMessages.POST_NOT_FOUND,
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPost(id);
    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    type: PostWithPaginationRdo,
    status: HttpStatus.OK,
    description: postMessages.POSTS_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: postMessages.POST_NOT_FOUND,
  })
  @Get('/')
  public async index(@Query() query: PostQuery) {
    const postsWithPagination = await this.postService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };
    return fillDto(PostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: postMessages.POST_CREATED,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: postMessages.ERROR,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: postMessages.POST_UNAUTHORIZED,
  })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: postMessages.POST_DELETED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: postMessages.POST_UNAUTHORIZED,
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: postMessages.POST_UPDATED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: postMessages.POST_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: postMessages.POST_UNAUTHORIZED,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);
    return fillDto(PostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: postMessages.POST_COMMENT_ADDED,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: postMessages.POST_COMMENT_ERROR,
  })
  @Post('/:postId/comments')
  public async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.postService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: postMessages.POST_REPOST_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: postMessages.POST_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: postMessages.POST_UNAUTHORIZED,
  })
  @UseGuards(JwtAuthGuard)
  @Post(':postId/:userId')
  public async repost(
    @Param('postId') postId: string,
    @Param('userId') userId: string
  ): Promise<PostRdo> {
    const newPost = await this.postService.makeRepost(postId, userId);
    return fillDto(PostRdo, newPost.toPOJO());
  }
}

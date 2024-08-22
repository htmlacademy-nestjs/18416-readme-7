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
} from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';
import { PostQuery } from './post.query';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  CommentRdo,
  CreateCommentDto,
  DeleteCommentDto,
} from '@project/comments';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  postDescription,
  postMessages,
  postParams,
  postResponseMessages,
} from './post.constant';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { CreateLikeDto, LikeRdo } from '@project/blog-like';
import { AppResponseMessage } from '@project/shared/core';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Показ конкретной публикации
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

  // Показ всех публикаций
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

  // Создание публикации
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
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  // Список черновиков пользователя
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: postMessages.POSTS_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: postMessages.POST_UNAUTHORIZED,
  })
  @Get('/drafts')
  public async getDrafts(@Req() { user }: RequestWithUser) {
    const postWithPagination = await this.postService.getAllPosts(
      { userId: user.id } as PostQuery,
      true
    );

    const result = {
      ...postWithPagination,
      entities: postWithPagination.entities.map((blogPost) =>
        blogPost.toPOJO()
      ),
    };

    return fillDto(PostWithPaginationRdo, result);
  }

  // Удаление публикации
  @ApiResponse({
    status: HttpStatus.OK,
    description: postMessages.POST_DELETED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: postMessages.POST_UNAUTHORIZED,
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }

  // Апдейт публикации
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
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);
    return fillDto(PostRdo, updatedPost.toPOJO());
  }

  // Создание комментария
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: postMessages.POST_COMMENT_ADDED,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: postMessages.POST_COMMENT_ERROR,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AppResponseMessage.UNAUTHORIZED,
  })
  @Post('/:postId/comments')
  public async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.postService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

  // Вывод списка комментариев к посту
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: postMessages.COMMENTS_FOUND,
  })
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.NOT_FOUND,
    description: postMessages.COMMENTS_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: postMessages.POST_COMMENT_ERROR,
  })
  public async showComments(@Param('postId') postId: string) {
    const comments = await this.postService.getComments(postId);
    return fillDto(CommentRdo, comments);
  }

  // Удаление комментария
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
  @Delete('/:postId/comments')
  public async deleteComment(@Body() dto: DeleteCommentDto) {
    await this.postService.deleteComment(dto);
  }

  // Репост публикации
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
    description: AppResponseMessage.UNAUTHORIZED,
  })
  @Post('repost/:postId')
  public async repost(
    @Req() { user }: RequestWithUser,
    @Param('postId') postId: string
  ): Promise<PostRdo> {
    const newPost = await this.postService.makeRepost(postId, user.id);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  // Поиск публикации по тайтлу
  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: postMessages.POSTS_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: postMessages.POST_NOT_FOUND,
  })
  @Get('/search')
  public async search(@Query('postTitle') postTitle: string) {
    const postWithPagination = await this.postService.getAllPosts({
      postTitle,
      limit: postParams.DEFAULT_SEARCH_LIMIT,
    } as PostQuery);

    return postWithPagination.entities.map((blogPost) =>
      fillDto(PostRdo, blogPost.toPOJO())
    );
  }

  // Создание лайка
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
  @Post('/:postId/likes')
  public async createLike(
    @Param('postId') postId: string,
    @Body() dto: CreateLikeDto
  ) {
    const newLike = await this.postService.addLike(postId, dto);
    return fillDto(LikeRdo, newLike.toPOJO());
  }

  // Удаление лайка
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: postResponseMessages.POST_LIKE_NOT_FOUND,
  })
  @Delete('/:postId/likes')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteLike(
    @Param('postId') postId: string,
    @Body() dto: CreateLikeDto
  ) {
    await this.postService.deleteLike(postId, dto);
  }

  @Get('/:userId/count')
  public async count(@Param('userId') userId: string) {
    const count = await this.postService.getCount(userId);

    return count;
  }

  // Поиск по дате
  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: postMessages.POST_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: postMessages.USER_IS_NOT_AUTHOR,
  })
  @ApiQuery({ type: 'date', description: postDescription.POST_LAST_DATE })
  @Get('/find-after-date')
  public async findAfterDate(@Query('date') date: Date) {
    const posts = await this.postService.findAfterDate(date);

    return posts.map((post) => fillDto(PostRdo, post.toPOJO()));
  }
}

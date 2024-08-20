import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentQuery } from './comment.query';
import { CommentWithPaginationRdo } from './rdo/comment-with-pagination.rdo';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:id')
  public async index(@Param('id') id: string) {
    const commentEntity = await this.commentService.getCommentById(id);
    return fillDto(CommentRdo, commentEntity.toPOJO());
  }

  @Get('/')
  public async show(@Param('postId') postId: string, query: CommentQuery) {
    const commentEntities = await this.commentService.getComments(
      postId,
      query
    );
    const result = {
      ...commentEntities,
      entities: commentEntities.entities.map((comment) => comment.toPOJO()),
    };
    return fillDto(CommentWithPaginationRdo, result);
  }

  @Post('/')
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.commentService.createComment(postId, dto);
    return fillDto(CommentRdo, newComment);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.commentService.deleteComment(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    const updatedComment = await this.commentService.updateComment(id, dto);
    return fillDto(CommentRdo, updatedComment.toPOJO());
  }
}

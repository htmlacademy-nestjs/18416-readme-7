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

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:id')
  public async index(@Param('id') id: string) {
    const commentEntity = await this.commentService.getCommentById(id);
    return fillDto(CommentRdo, commentEntity.toPOJO());
  }

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const commentEntities = await this.commentService.getComments(postId);
    const comments = commentEntities.map((comment) => comment.toPOJO());
    return fillDto(CommentRdo, comments);
  }

  @Post('/')
  public async create(@Body() dto: CreateCommentDto) {
    const newCategory = await this.commentService.createComment(dto);
    return fillDto(CommentRdo, newCategory.toPOJO());
  }

  //   @Post('/')
  //   public async create(
  //     @Param('postId') postId: string,
  //     @Body() dto: CreateCommentDto
  //   ) {
  //     const newComment = await this.commentService.createComment(postId, dto);
  //     return fillDto(CommentRdo, newComment.toPOJO());
  //   }

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

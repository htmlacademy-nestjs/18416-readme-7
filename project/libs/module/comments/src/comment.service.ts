import { Injectable, NotFoundException } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentFactory } from './comment.factory';
import { CommentQuery } from './comment.query';
import { PaginationResult } from '@project/shared/core';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    public readonly commentFactory: CommentFactory
  ) {}

  public async getCommentById(
    id: string,
    query?: CommentQuery
  ): Promise<CommentEntity> {
    return this.commentRepository.findByPostId(id, query);
  }

  public async createComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<void> {
    const commentEntity = this.commentFactory.create({ postId, ...dto });
    await this.commentRepository.save(commentEntity);
  }

  public async getComments(
    postId: string,
    query?: CommentQuery
  ): Promise<PaginationResult<CommentEntity>> {
    return this.commentRepository.findByPostId(postId, query);
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await this.commentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  public async updateComment(
    id: string,
    dto: UpdateCommentDto
  ): Promise<CommentEntity> {
    const commentEntity = new CommentEntity(dto);

    try {
      await this.commentRepository.update(commentEntity);
      return commentEntity;
    } catch {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}

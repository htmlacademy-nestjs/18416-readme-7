import { Injectable } from '@nestjs/common';

import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeFactory } from './like.factory';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    public readonly likeFactory: LikeFactory
  ) {}

  public async getLikes(postId: string): Promise<LikeEntity[]> {
    return this.likeRepository.findByPostId(postId);
  }

  public async createComment(
    postId: string,
    dto: CreateLikeDto
  ): Promise<void> {
    const likeEntity = this.likeFactory.create({
      ...dto,
      postId,
    });
    await this.likeRepository.save(likeEntity);
  }
}

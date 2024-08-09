import { Injectable } from '@nestjs/common';
import { Like, EntityFactory } from '@project/shared/core';
import { LikeEntity } from './like.entity';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeFactory implements EntityFactory<LikeEntity> {
  public create(entityPlainData: Like): LikeEntity {
    return new LikeEntity(entityPlainData);
  }

  public createFromDto(dto: CreateLikeDto, postId: string): LikeEntity {
    const currentDate = new Date();
    return new LikeEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}

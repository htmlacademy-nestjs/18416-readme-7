import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';

import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { LikeFactory } from './like.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, LikeFactory],
  exports: [LikeRepository, LikeFactory],
})
export class LikeModule {}

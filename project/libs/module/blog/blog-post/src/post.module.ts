import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';
import { CommentModule } from '@project/comments';
import { LikeModule } from '@project/blog-like';
@Module({
  imports: [PrismaClientModule, CommentModule, LikeModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
})
export class PostModule {}

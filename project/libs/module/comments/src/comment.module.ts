import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentFactory } from './comment.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentFactory],
})
export class CommentModule {}

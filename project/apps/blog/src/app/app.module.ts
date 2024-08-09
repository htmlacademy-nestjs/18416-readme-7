import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommentModule } from '@project/comments';
import { PostModule } from '@project/blog-post';

@Module({
  imports: [CommentModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

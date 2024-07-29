import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommentModule } from '@project/comments';

@Module({
  imports: [CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

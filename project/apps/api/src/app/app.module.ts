import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConstants } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './blog.controller';
import { LikeController } from './like.controller';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: ApiConstants.HTTP_CLIENT_TIMEOUT,
      maxRedirects: ApiConstants.HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [
    UsersController,
    BlogController,
    LikeController,
    CommentsController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}

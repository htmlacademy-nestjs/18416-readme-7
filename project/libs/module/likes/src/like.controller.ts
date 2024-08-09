import { Controller, Get, Param } from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { LikeService } from './like.service';
import { LikeRdo } from './rdo/like.rdo';

@Controller('posts/:postId/likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get('/')
  public async index(@Param('postId') postId: string) {
    const likes = await this.likeService.getLikes(postId);
    return fillDto(
      LikeRdo,
      likes.map((like) => like.toPOJO())
    );
  }
}

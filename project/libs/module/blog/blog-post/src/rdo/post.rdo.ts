import { Expose, Type } from 'class-transformer';
import { PostType } from '@project/shared/enums';
import { ApiProperty } from '@nestjs/swagger';
import { CommentRdo } from '@project/comments';
import { Comment } from '@project/shared/core';

export class PostRdo {
  @ApiProperty({
    description: 'Post ID',
    example: '342345-sdfsdfsdf-2342342-sddsdfdfs',
  })
  @Expose()
  public id: string;

  @ApiProperty({ description: 'Post title', example: 'Post title' })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'author id',
    example: '2343dfsdsdfw4r2344234sdff',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Is publication reposted flag',
    example: true,
  })
  @Expose()
  public isPublicationReposted: boolean;

  @ApiProperty({
    description: 'Post type',
    example: PostType.LINK,
  })
  @Expose()
  public type: PostType;

  @ApiProperty({
    description: 'Post created at date',
    example: '2024-08-01',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Post tags',
    isArray: true,
    example: ['#aaa', '#bbb'],
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'List of users who liked post',
    isArray: true,
    example: ['324234sdfsdfds', '234234sdfsdfsdffd'],
  })
  @Expose()
  public likes: string[];

  @ApiProperty({
    description: 'List of comments for the post',
    isArray: true,
    example: [
      {
        postId: '32324-sdfsdsdf-23423-dfsfsdf',
        text: 'Somehow comment',
        userId: '23234effsdfsdffsd',
        createdAt: '2024-08-01T13:00:21.865Z',
      },
      {
        postId: 'asdasd34-6b0e-2343234-952dsdfsdf8-sdfdsf',
        text: 'Somehow comment 2',
        userId: 'asdasd234234dfsfsdf',
        createdAt: '2024-08-22T02:40:06.391Z',
      },
    ],
  })
  @Expose()
  @Type(() => CommentRdo)
  public comments: Comment[];
}

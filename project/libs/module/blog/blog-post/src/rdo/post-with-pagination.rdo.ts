import { Expose, Type } from 'class-transformer';

import { PostRdo } from './post.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/enums';

export class PostWithPaginationRdo {
  @ApiProperty({
    description: 'Post items list',
    example: [
      {
        id: 'asdasd32-32234234-dsffdsfsdf',
        name: 'Post 1',
        type: PostType.TEXT,
        userId: '23234324wesdfsd234423',
        createdAt: '2024-04-19T11:29:11.202Z',
        updatedAt: '2024-04-19T11:29:11.202Z',
        isPublicationReposted: true,
        tags: ['test_tag'],
        likes: [],
        comments: [],
      },
    ],
  })
  @Expose()
  @Type(() => PostRdo)
  public entities: PostRdo[];

  @ApiProperty({
    description: 'Total number of pages',
    example: 100,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Total items',
    example: 33,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Current page',
    example: 1,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 2,
  })
  @Expose()
  public itemsPerPage: number;
}

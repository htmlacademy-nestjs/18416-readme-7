import { Expose } from 'class-transformer';
import { CommentRdo } from './comment.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class CommentWithPaginationRdo {
  @ApiProperty({
    description: 'Comment entities',
    type: CommentRdo,
    isArray: true,
  })
  @Expose()
  public entities: CommentRdo[];

  @ApiProperty({
    description: 'Comment total pages',
    example: 2,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Comment total items',
    example: 4,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Comment current page',
    example: 1,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Comment items per page',
    example: 50,
  })
  @Expose()
  public itemsPerPage: number;
}

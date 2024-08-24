import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { SortDirection } from '@project/shared/core';

import { CommentsParams, DEFAULT_SORT_DIRECTION } from './comment.constant';

export class CommentQuery {
  @Transform(
    ({ value }) => +value || CommentsParams.DEFAULT_COMMENT_COUNT_LIMIT
  )
  @IsNumber()
  @IsOptional()
  public limit = CommentsParams.DEFAULT_COMMENT_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || CommentsParams.DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = CommentsParams.DEFAULT_PAGE_COUNT;
}

import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { SortDirection } from '@project/shared/core';

import {
  DEFAULT_COMMENT_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_PAGE_COUNT,
} from './comment.constant';

export class CommentQuery {
  @Transform(({ value }) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENT_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}

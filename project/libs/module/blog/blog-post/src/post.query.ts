import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { SortDirection } from '@project/shared/core';

import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_PAGE_COUNT,
} from './post.constant';
import { PostType } from '@prisma/client';

export class PostQuery {
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;

  @IsString()
  @IsOptional()
  public pageTitle: string;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortByLikes: SortDirection;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortByComments: SortDirection;

  @IsString()
  @IsEnum(PostType)
  @IsOptional()
  public type: PostType;

  @IsString()
  @IsMongoId()
  @IsOptional()
  public userId: string;

  @IsString()
  @IsOptional()
  public tag: string;
}

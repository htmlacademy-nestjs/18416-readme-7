import { SortDirection } from '@project/shared/core';

export const MAX_COMMENTS_COUNT = 50;
export const TEXT_MIN_LENGTH = 10;
export const TEXT_MAX_LENGTH = 300;

export const DEFAULT_COMMENT_COUNT_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const CommentValidationMessages = {
  MessageEmpty: 'Comment Message is empty',
  IDInvalid: 'Invalid id',
  UserIDInvalidd: 'Invalid user id',
  WrongMinLength: 'Comment Message is too short',
  WrongMaxLength: 'Comment Message is too long',
} as const;

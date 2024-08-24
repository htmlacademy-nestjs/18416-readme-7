import { SortDirection } from '@project/shared/core';

export enum CommentsParams {
  TEXT_MIN_LENGTH = 10,
  TEXT_MAX_LENGTH = 300,
  DEFAULT_COMMENT_COUNT_LIMIT = 50,
  DEFAULT_PAGE_COUNT = 1,
}

export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;

export const CommentValidationMessages = {
  MessageEmpty: 'Comment Message is empty',
  IDInvalid: 'Invalid id',
  UserIDInvalidd: 'Invalid user id',
  WrongMinLength: 'Comment Message is too short',
  WrongMaxLength: 'Comment Message is too long',
} as const;

export enum CommentResponseMessages {
  COMMENTS_FOUND = 'Comments found',
}

export enum CommentsParamDescription {
  POST_ID = 'Post id',
}

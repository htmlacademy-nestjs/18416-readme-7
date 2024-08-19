import { SortDirection } from '@project/shared/core';

export const DEFAULT_POST_COUNT_LIMIT = 10;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export enum postMessages {
  POSTS_FOUND = 'Posts were found',
  POST_FOUND = 'Post was found',
  POST_NOT_FOUND = 'Post was not found',
  POST_REPOST_SUCCESS = 'Post was reposted',
  POST_COMMENT_ADDED = 'Post comment was added',
  POST_COMMENT_ERROR = 'Something wrong when post comments',
  POST_UPDATED = 'Post was updated',
  POST_DELETED = 'Post was deleted',
  POST_CREATED = 'Post was created',
  ERROR = 'Internal server error',
  POST_UNAUTHORIZED = 'Unauthorized to work with publications',
}

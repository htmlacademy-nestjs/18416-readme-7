import { SortDirection } from '@project/shared/core';

export enum postParams {
  DEFAULT_POST_COUNT_LIMIT = 10,
  DEFAULT_PAGE_COUNT = 1,
  DEFAULT_SEARCH_LIMIT = 20,
}
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;

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
  USER_IS_ALREADY_AUTHOR = 'User is already an author',
  CANNOT_REPOST_DRAFT = 'Cannot repost a draft',
  POST_ALREADY_REPOSTED = 'This post is already reposted',
}

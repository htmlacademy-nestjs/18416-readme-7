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
  LIKES_ONLY_FOR_PUBLISHED_POSTS = 'Likes are available only for published',
  LIKES_COUNT = 'Likes count',
  COMMENT_NOT_FOUND = 'Comment was not found',
  USER_IS_NOT_AUTHOR = 'User is not an author',
  COMMENTS_FOUND = 'Comments found',
}

export enum postResponseMessages {
  POST_LIKE_NOT_FOUND = 'Like was not found',
  POST_IS_NOT_PUBLISHED = 'Post is not published',
  LIKE_ALREADY_EXISTS = 'Like already exists',
  USER_NOT_AUTHORIZED = 'User is not authorized',
}

export enum postValidateMessages {
  POST_TITLE_REQUIRED = 'Title is required',
  POST_TITLE_MAX_LENGTH = 'Title must be less than 255 characters',
  POST_TITLE_MIN_LENGTH = 'Title must be more than 3 characters',
  POST_CONTENT_REQUIRED = 'Content is required',
  POST_CONTENT_MAX_LENGTH = 'Content must be less than 10000 characters',
  POST_CONTENT_MIN_LENGTH = 'Content must be more than 3 characters',
  NAME_IS_NOT_STRING = 'Name is not in string format',
  NAME_MIN_LENGTH = 'Name must be more than 3 characters',
  NAME_MAX_LENGTH = 'Name must be less than 255 characters',
  PASSWORD_IS_NOT_STRING = 'Password is not in string format',
}

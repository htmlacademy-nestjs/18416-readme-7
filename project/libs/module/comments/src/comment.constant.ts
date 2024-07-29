// Минимальная длина: 10 символов, максимальная: 300

export const MAX_COMMENTS_COUNT = 50;
export const MIN_COMMENT_LENGTH = 10;
export const MAX_COMMENT_LENGTH = 300;

export const CommentValidationMessages = {
  MessageEmpty: 'Comment Message is empty',
  IDInvalid: 'Invalid id',
} as const;

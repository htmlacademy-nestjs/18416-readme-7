export enum AuthenticationResponseStatuses {
  RESPONSE_CREATED_USER = 'Returns a newly created user',
  RESPONSE_VERIFIED_USER = 'Returns a verified user',
  RESPONSE_USER_EXIST = 'User exists',
  RESPONSE_USER_NOT_FOUND = 'User Not Found',
  RESPONSE_RETURNS_USER_BY_ID = 'Returns user by id',
  RESPONSE_SERVER_ERROR = 'Internal server error',
  RESPONSE_UNAUTHORZED = 'User is not authorized',
  RESPONSE_WRONG_PASSWORD = 'Wrong password',
  PASSWORD_IS_CHANGED = 'Password is changed',
}

export enum AuthenticationValidateMessages {
  EMAIL_NOT_VALID = 'Email not valid',
  DATE_REGISTER_NOT_VALID = 'Register date is not valid',
  TOKEN_CREATION_ERROR = 'Error while creating a token',
  PASSWORD_IS_NOT_STRING = 'Password should be a string',
  PASSWORD_MIN_LENGTH = 'Password min length exceeded',
  PASSWORD_MAX_LENGTH = 'Password max length exceeded',
}

export enum AuthenticationValidateParams {
  NAME_MIN_LENGTH = 3,
  NAME_MAX_LENGTH = 50,
  PASSWORD_MIN_LENGTH = 6,
  PASSWORD_MAX_LENGTH = 12,
}

export enum RefreshTokenParams {
  REFRESH_TOKEN_SECRET = '2323dsdfsdffds',
  REFRESH_TOKEN_EXPIRES_IN = '30d',
}

export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/auth',
  Blog = 'http://localhost:3002/api/posts',
  File = 'http://localhost:3003/api/files',
  FilesStorage = 'FilesStorage',
}

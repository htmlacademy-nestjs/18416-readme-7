export enum AuthenticationResponseStatuses {
  RESPONSE_CREATED_USER = 'Returns a newly created user',
  RESPONSE_VERIFIED_USER = 'Returns a verified user',
  RESPONSE_USER_EXIST = 'User exists',
  RESPONSE_USER_NOT_FOUND = 'User Not Found',
  RESPONSE_RETURNS_USER_BY_ID = 'Returns user by id',
  RESPONSE_SERVER_ERROR = 'Internal server error',
  RESPONSE_UNAUTHORZED = 'User is not authorized',
  RESPONSE_WRONG_PASSWORD = 'Wrong password',
}

export enum AuthenticationValidateMessages {
  EMAIL_NOT_VALID = 'Email not valid',
  DATE_REGISTER_NOT_VALID = 'Register date is not valid',
  TOKEN_CREATION_ERROR = 'Ошибка при создании токена',
}

export enum RefreshTokenParams {
  REFRESH_TOKEN_SECRET = '2323dsdfsdffds',
  REFRESH_TOKEN_EXPIRES_IN = '30d',
}

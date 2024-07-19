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

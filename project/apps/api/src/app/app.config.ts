export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/auth',
  Blog = 'http://localhost:3002/api/posts',
  File = 'http://localhost:3003/api/files',
  Notify = 'http://localhost:3004/api/notify',
  FilesStorage = 'FilesStorage',
}

export enum ApiConstants {
  HTTP_CLIENT_MAX_REDIRECTS = 5,
  HTTP_CLIENT_TIMEOUT = 3000,
}

export enum ConfigurationParams {
  DEFAULT_PORT = 3001,
  DEFAULT_MONGO_PORT = 27017,
  DEFAULT_RABBIT_PORT = 5672,
}

export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/auth',
  Blog = 'http://localhost:3002/api/posts',
  File = 'http://localhost:3003/api/files',
  FilesStorage = 'FilesStorage',
}

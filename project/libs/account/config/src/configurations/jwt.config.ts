import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { BlogUserEntity } from '@project/blog-user';
export interface JWTConfig {
  refreshTokenExpiresIn: string;
  refreshTokenSecret: string | Buffer;
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
}

const validationSchema = Joi.object({
  accessTokenSecret: Joi.string().required(),
  accessTokenExpiresIn: Joi.string().required(),
});

function validateConfig(config: JWTConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Account JWTConfig Validation Error]: ${error.message}`);
  }
}

function getConfig(): JWTConfig {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  };

  validateConfig(config);
  return config;
}

export interface RequestWithUser {
  user?: BlogUserEntity;
}

export default registerAs('jwt', getConfig);

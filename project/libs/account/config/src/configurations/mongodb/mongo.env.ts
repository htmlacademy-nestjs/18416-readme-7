import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateOrReject,
} from 'class-validator';

import { MongoConfigurationMessages } from './mongo.messages';
import { MongoConfigurationParams } from './mongo.enum';

export class MongoConfiguration {
  @IsString({ message: MongoConfigurationMessages.DB_NAME_REQUIRED })
  public name: string;

  @IsString({ message: MongoConfigurationMessages.DB_HOST_REQUIRED })
  public host: string;

  @IsNumber({}, { message: MongoConfigurationMessages.DB_PORT_REQUIRED })
  @Min(MongoConfigurationParams.MIN_PORT)
  @Max(MongoConfigurationParams.MAX_PORT)
  @IsOptional()
  public port: number = MongoConfigurationParams.DEFAULT_PORT;

  @IsString({ message: MongoConfigurationMessages.DB_USER_REQUIRED })
  public user: string;

  @IsString({ message: MongoConfigurationMessages.DB_PASSWORD_REQUIRED })
  public password: string;

  @IsString({ message: MongoConfigurationMessages.DB_BASE_AUTH_REQUIRED })
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

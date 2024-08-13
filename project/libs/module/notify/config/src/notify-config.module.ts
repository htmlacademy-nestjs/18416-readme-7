import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import NotifyConfig from './notify-config';

const ENV_FILE_PATH = 'apps/notify/notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [NotifyConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class NotifyConfigModule {}

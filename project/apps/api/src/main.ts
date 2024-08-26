/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RequestIdInterceptor } from '@project/interceptors';

import { AppModule } from './app/app.module';
import { GLOBAL_API_PREFIX } from '@project/shared/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.useGlobalInterceptors(new RequestIdInterceptor());

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_API_PREFIX}`
  );
}

bootstrap();

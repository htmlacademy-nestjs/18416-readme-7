/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { GLOBAL_API_PREFIX } from '@project/shared/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Account API')
    .setDescription('Account API description')
    .setVersion('1.0')
    .addTag('account')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const configService = app.get(ConfigService);
  const port = configService.get('application.port');

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_API_PREFIX}`
  );
}

bootstrap();

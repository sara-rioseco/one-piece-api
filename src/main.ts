import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { corsOptions, validationOptions } from './config';
import { useContainer } from 'typeorm';
import { CustomExceptionFilter } from './middleware';

async function bootstrap() {
  const port = 3000;
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.disable('x-powered-by');
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new CustomExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}
bootstrap();

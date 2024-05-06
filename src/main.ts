import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors');

async function bootstrap() {
  // logger
  const logger = new Logger('Main-Client-Gateway-Microservice');

  const app = await NestFactory.create(AppModule);

  // Set Global Prefix
  app.setGlobalPrefix('api');

  // Global Pipes Configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // RPC Custom Exception Filter
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port);

  logger.log(
    `${colors.white('Client-Gateway-Microservice')} ${colors.green('running on port:')} ${colors.black.bgWhite(envs.port.toString())}`,
  );
}
bootstrap();

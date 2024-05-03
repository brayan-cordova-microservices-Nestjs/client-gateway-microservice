import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors');

async function bootstrap() {
  // logger
  const logger = new Logger('Main-Client-Gateway-Microservice');

  const app = await NestFactory.create(AppModule);

  // Set Global Prefix
  app.setGlobalPrefix('api');

  await app.listen(envs.port);

  logger.log(
    `${colors.white('Client-Gateway-Microservice')} ${colors.green('running on port:')} ${colors.black.bgWhite(envs.port.toString())}`,
  );
}
bootstrap();

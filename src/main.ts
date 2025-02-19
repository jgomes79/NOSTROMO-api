import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { swaggerOptions } from './doc';
import domains from './lib/security/config';

// Environment
dotenv.config({ path: '.env' });

export const logger = new Logger('APIGateway');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Body parser for form data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Swagger setup for development environment
  if (process.env.NODE_ENV === 'development') {
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('doc', app, document);
  } else {
    // Helmet for production environment
    app.use(helmet());
  }

  // CORS configuration
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? domains.PRO
        : [...domains.LOCAL, ...domains.STAGING],
    credentials: true,
  });

  // Start listening on the specified port
  await app.listen(process.env.PORT);
}

export default bootstrap;
bootstrap();

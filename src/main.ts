import { Logger, ValidationPipe } from '@nestjs/common';
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

  // Global validation pipe for class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger setup for development environment
  if (process.env.NODE_ENV === 'development') {
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('doc', app, document);
  } else {
    // Helmet for production environment
    app.use(helmet());
  }

  // CORS configuration
  const CORS_ORIGINS: string[] = domains[process.env.NODE_ENV?.toUpperCase() as keyof typeof domains] || domains.LOCAL;
  app.enableCors({
    origin: (origin, callback) => {
      // allow requests with no Origin (e.g. curl, Postman)
      if (!origin) return callback(null, true);
      if (CORS_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(
        new Error(`Origin ${origin} not allowed by CORS`),
        false,
      );
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  // Start listening on the specified port
  await app.listen(process.env.PORT);
}

export default bootstrap;
bootstrap();

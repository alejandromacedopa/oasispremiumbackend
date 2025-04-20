import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function StartApp() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Idempotency-Key'],
    origin: '*', // URLS PERMITIDAS
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.use(bodyParser.json({ limit: '10mb' })); // LIMITES | 10MB
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  await app.listen(3000, 'localhost'); // 0.0.0.0.0 para toda ip ext.
}
StartApp();

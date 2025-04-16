import { register } from 'tsconfig-paths';
import { join } from 'path';

register({
  baseUrl: join(__dirname, '..'),
  paths: {
    'src/*': ['src/*'],
    'db/*': ['db/*'],
  },
});

import {
  NestFactory,
  Reflector,
} from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
    credentials: true,
  });

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(
      app.get(Reflector),
    ),
  );

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );
  app.setGlobalPrefix('api/v1');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Regenerative Aesthetics API')
    .setDescription(
      'Regenerative Aesthetics API Description',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  SwaggerModule.setup('api/v1', app, document); // Serve at /api/v1

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

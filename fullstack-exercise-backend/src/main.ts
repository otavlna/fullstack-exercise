import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { cwd } from 'process';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(`Running in ${process.env.NODE_ENV} mode`);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useStaticAssets(
    join(cwd(), process.env.UPLOADED_FILES_DEST ?? 'uploads'),
  );

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Fullstack-exercise')
    .setDescription(
      'The fullstack-exercise API description. Please login to access protected routes, which will return an http-only access-token cookie.',
    )
    .setVersion('1.0')
    .addCookieAuth('access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:443',
      'http://sudety.ch:3000',
    ],
    credentials: true,
  });

  await app.listen(1337);
}
bootstrap();

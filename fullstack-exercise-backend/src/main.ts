import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { cwd } from 'process';
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

  app.useStaticAssets(
    join(cwd(), process.env.UPLOADED_FILES_DEST ?? 'uploads'),
  );

  const config = new DocumentBuilder()
    .setTitle('Fullstack-exercise')
    .setDescription('The fullstack-exercise API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: ['http://localhost:3000'] });

  await app.listen(1337);
}
bootstrap();

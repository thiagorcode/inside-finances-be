import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { rateLimit } from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { LIMIT_EACH_REQUEST, WINDOW_MS } from './shared/constants/configServer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Finances API')
    .setDescription('The app API description')
    .setVersion('0.5.1')
    .addTag('app')
    .setContact('Thiago Rodrigues', '', 'ti.thiago.rodrigues@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  app.setGlobalPrefix('api');

  app.use(
    rateLimit({
      windowMs: WINDOW_MS, 
      max: LIMIT_EACH_REQUEST,
      
    }),
  );

  await app.listen(process.env.PORT);

  console.log('Rodando na porta ' + process.env.PORT);
}

bootstrap();

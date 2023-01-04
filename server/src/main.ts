import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { rateLimit } from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('Finances API')
    .setDescription('The app API description')
    .setVersion('0.2.0')
    .addTag('app')
    .setContact('Thiago Rodrigues', '', 'ti.thiago.rodrigues@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  app.setGlobalPrefix('api');

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 10000 requests per windowMs
    }),
  );

  await app.listen(process.env.PORT);

  console.log('Rodando na porta ' + process.env.PORT);
}

bootstrap();

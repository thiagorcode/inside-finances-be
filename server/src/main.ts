import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from 'src/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Finances API')
    .setDescription('The app API description')
    .setVersion('0.2.0')
    .addTag('app')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  console.log(process.env.PORT);
  await app.listen(process.env.PORT);

  console.log('Rodando na porta ' + process.env.PORT);
}
bootstrap();

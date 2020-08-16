import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // protection
    const options = new DocumentBuilder()
      .setTitle('Organization')
      .setDescription('Sample Organization application using nestjs')
      .setVersion('1.0')
      .addTag('Organization Demo')
      .addBasicAuth({ in: 'header', type: 'http' })
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

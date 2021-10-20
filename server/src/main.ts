import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: '*',
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });

  const config = new DocumentBuilder()
    .setTitle('Coin trading')
    .setDescription('The coin trading description')
    .setVersion('1.0')
    .addTag('trading')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();

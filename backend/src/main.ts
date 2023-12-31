import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.set('trust proxy', 1);
  app.enableCors({
    origin: [process.env.CORS_URL],
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  });

  const config = new DocumentBuilder()
  .setTitle('CPS Studies Group')
  .setDescription("It's an API created aimed to join Fatec and Etec students by means of studies group, whereas sharing knowledge")
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

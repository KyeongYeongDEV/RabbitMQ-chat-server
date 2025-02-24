import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('SERVER_PORT', 3000);

  // Swagger 설정
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API 문서입니다.')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📄 Swagger is available at http://localhost:${port}/api`);
}

bootstrap();
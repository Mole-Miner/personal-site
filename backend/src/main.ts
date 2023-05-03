import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { PrismaService } from "./prisma/prisma.service";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({ transform: true, disableErrorMessages: true }));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();

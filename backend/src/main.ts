import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import fastifyCookie from "@fastify/cookie";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from './app.module';
import { PrismaService } from "./prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  app.enableCors({ origin: 'http://localhost:4200' });

  app.useGlobalPipes(new ValidationPipe({ transform: true, disableErrorMessages: false }));
  app.setGlobalPrefix('api/v1');

  await app.register(fastifyCookie);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ExperienceModule } from './experience/experience.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CompaniesModule,
    ExperienceModule,
    ImagesModule
  ],
  controllers: [ AppController ]
})
export class AppModule {
}

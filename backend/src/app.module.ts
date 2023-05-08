import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from "./skills/skills.module";
import { NewsModule } from "./news/news.module";
import { JobsModule } from "./jobs/jobs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    SkillsModule,
    NewsModule,
    JobsModule
  ],
  controllers: [ AppController ]
})
export class AppModule {
}

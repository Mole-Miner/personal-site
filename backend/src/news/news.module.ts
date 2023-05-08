import { Module } from '@nestjs/common';

import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [ NewsService ],
  controllers: [ NewsController ],
  imports: [ PrismaModule, AuthModule ]
})
export class NewsModule {
}

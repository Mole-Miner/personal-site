import { Module } from '@nestjs/common';

import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [ JobsService ],
  controllers: [ JobsController ],
  imports: [ PrismaModule, AuthModule ]
})
export class JobsModule {
}

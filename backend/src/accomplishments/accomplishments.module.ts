import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { AccomplishmentsService } from './accomplishments.service';
import { AccomplishmentsController } from './accomplishments.controller';

@Module({
  imports: [PrismaModule],
  providers: [AccomplishmentsService],
  controllers: [AccomplishmentsController],
})
export class AccomplishmentsModule {}

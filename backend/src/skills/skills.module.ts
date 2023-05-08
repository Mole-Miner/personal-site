import { Module } from '@nestjs/common';

import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ SkillsController ],
  providers: [ SkillsService ],
  imports: [ PrismaModule, AuthModule ]
})
export class SkillsModule {
}

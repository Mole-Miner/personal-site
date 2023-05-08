import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { PrismaModule } from "../prisma/prisma.module";
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { TokensService } from './tokens.service';
import { JwtConfig } from "./jwt.config";
import { AuthController } from './auth.controller';

@Module({
  providers: [ AuthService, TokensService ],
  imports: [
    ConfigModule.forFeature(JwtConfig),
    JwtModule.registerAsync({
      inject: [ ConfigService ],
      useFactory: (config: ConfigService) => ({
        global: true,
        verifyOptions: {
          algorithms: [ config.get('jwt.algorithm') ],
          ignoreExpiration: false
        }
      })
    }),
    PrismaModule,
    UsersModule
  ],
  controllers: [ AuthController ],
  exports: [ AuthService, TokensService ]
})
export class AuthModule {
}

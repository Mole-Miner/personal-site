import { Body, Controller, Get, Post, Response, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { map, Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  profile(@Request() req: FastifyRequest): string {
    return req['user'];
  }

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Response({ passthrough: true }) response: FastifyReply,
  ): Observable<string> {
    return this.authService.login(loginDto).pipe(
      map(({ access, refresh }) => {
        response.cookie('refresh', refresh);
        return JSON.stringify(access);
      }),
    );
  }

  @Post('refresh')
  refresh(@Response({ passthrough: true }) response: FastifyReply) {
    return this.authService.refresh(response.cookies['refresh']).pipe(
      map(({ access, refresh }) => {
        response.cookie('refresh', refresh);
        return access;
      }),
    );
  }

  @Post('logout')
  logout(
    @Response({ passthrough: true }) response: FastifyReply,
  ): Observable<null> {
    return this.authService.logout(null).pipe(
      map(() => {
        response.cookie('refresh', null);
        return null;
      }),
    );
  }
}

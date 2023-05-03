import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';
import { Reflector } from "@nestjs/core";
import { FastifyRequest } from 'fastify';

import { TokensService } from "./tokens.service";
import { IS_PUBLIC_KEY } from "./public";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly tokensService: TokensService) {
  }

  canActivate(context: ExecutionContext): Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return of(true);
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const verifyJwtTokenAccess = this.tokensService.verifyAccessToken(token);
    return from(verifyJwtTokenAccess).pipe(
      map(payload => {
        request['user'] = payload;
        return true;
      }),
      catchError(() => throwError(() => new UnauthorizedException()))
    );
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [ type, token ] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

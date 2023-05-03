import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { forkJoin, from, map, Observable } from "rxjs";
import { Prisma, Token, User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

export type SignPayload = Pick<User, 'username' | 'role'> & { sub: string }
export type Verified = SignPayload & { iat: number; exp: number }
export type TokenPair = { access: string; refresh: string }

@Injectable()
export class TokensService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) {
  }

  generateTokenPair({ id, username, role }: User): Observable<TokenPair> {
    const payload = { username, sub: id, role } as SignPayload;
    const access$ = this.sign(payload, 'access');
    const refresh$ = this.sign(payload, 'refresh');
    return forkJoin([ access$, refresh$ ]).pipe(
      map(([ access, refresh ]) => ({ access, refresh }))
    );
  }

  saveToken({ refresh, userId, username }: { refresh: string; userId: string; username: string }): Observable<Token> {
    const args = {
      where: { userId },
      create: { refresh, user: { connect: { username } } },
      update: { refresh }
    } as Prisma.TokenUpsertArgs;
    return from(this.prisma.token.upsert(args));
  }

  findToken(where: Prisma.TokenWhereUniqueInput): Observable<Token> {
    return from(this.prisma.token.findUnique({ where }));
  }

  deleteToken(where: Prisma.TokenWhereUniqueInput) {
    return from(this.prisma.token.delete({ where }));
  }

  verifyAccessToken(value: string): Observable<Verified> {
    return this.verify(value, 'access');
  }

  verifyRefreshToken(value): Observable<Verified> {
    return this.verify(value, 'refresh');
  }

  private sign(payload: SignPayload, token: 'access' | 'refresh'): Observable<string> {
    const options = {
      secret: this.config.get(`jwt.${ token }`),
      expiresIn: this.config.get(`jwt.${ token }Expires`)
    } as JwtSignOptions;
    return from(this.jwt.signAsync(payload, options));
  }

  private verify(value: string, token: 'access' | 'refresh'): Observable<Verified> {
    const options = { secret: this.config.get(`jwt.${ token }`) } as JwtVerifyOptions;
    return from(this.jwt.verifyAsync<Verified>(value, options));
  }
}

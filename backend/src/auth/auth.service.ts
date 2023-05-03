import { Injectable, UnauthorizedException } from '@nestjs/common';
import { forkJoin, from, map, Observable, switchMap, throwError } from "rxjs";
import { compare } from "bcrypt";

import { UsersService } from "../users/users.service";
import { TokenPair, TokensService } from "./tokens.service";
import { LoginDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService
  ) {
  }

  login(loginDto: LoginDto): Observable<TokenPair> {
    return this.usersService.findUser({ username: loginDto.username }).pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new UnauthorizedException());
        }
        const isPasswordMatch$ = from(compare(loginDto.password, user.password));
        return isPasswordMatch$.pipe(
          switchMap((match) => {
            if (!match) {
              return throwError(() => new UnauthorizedException());
            }
            return this.tokensService.generateTokenPair(user).pipe(
              switchMap(({ access, refresh }) => {
                return this.tokensService.saveToken({ refresh, userId: user.id, username: user.username }).pipe(
                  map(() => ({ access, refresh } as TokenPair))
                );
              })
            );
          })
        );
      })
    );
  }

  refresh(refresh: string): Observable<TokenPair> {
    return this.tokensService.verifyRefreshToken(refresh).pipe(
      switchMap(token => {
        if (!token) {
          return throwError(() => new UnauthorizedException());
        }
        const token$ = this.tokensService.findToken({ userId: token.sub });
        const user$ = this.usersService.findUser({ username: token.username });
        return forkJoin([ token$, user$ ]).pipe(
          switchMap(([ token, user ]) => {
            if (!token || !user) {
              return throwError(() => new UnauthorizedException());
            }
            return this.tokensService.generateTokenPair(user).pipe(
              switchMap(({ access, refresh }) => {
                return this.tokensService.saveToken({ refresh, userId: user.id, username: user.username }).pipe(
                  map(() => ({ access, refresh } as TokenPair))
                )
              })
            );
          })
        );
      })
    );
  }

  logout(refresh: string): Observable<null> {
    return this.tokensService.verifyRefreshToken(refresh).pipe(
      switchMap(token => {
        if (!token) {
          return throwError(() => new UnauthorizedException());
        }
        return this.tokensService.deleteToken({ userId: token.sub }).pipe(
          map(() => null)
        );
      })
    );
  }
}

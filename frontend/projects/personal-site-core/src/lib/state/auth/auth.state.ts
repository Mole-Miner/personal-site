import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";

import { AuthService } from "../../services/auth.service";
import { Login, Logout, Refresh } from "./auth.action";

export interface AuthStateModel {
  token: string | null;
  username: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token({ token }: AuthStateModel): string | null {
    return token;
  }

  @Selector()
  static isLoggedIn({ token }: AuthStateModel): boolean {
    return !!token;
  }

  constructor(private readonly authService: AuthService) {
  }

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, { payload }: Login): Observable<string> {
    return this.authService.login(payload).pipe(
      tap(token => {
        patchState({
          token,
          username: payload.username
        });
      })
    );
  }

  @Action(Refresh)
  refresh({ patchState }: StateContext<AuthStateModel>): Observable<string> {
    return this.authService.refresh().pipe(
      tap(token => {
        patchState({
          token
        });
      })
    );
  }

  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>): Observable<null> {
    return this.authService.logout().pipe(
      tap(() => {
        setState({
          token: null,
          username: null
        });
      })
    );
  }
}

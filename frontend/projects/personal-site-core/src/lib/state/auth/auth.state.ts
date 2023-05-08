import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";

import { AuthService } from "../../services";
import { ActionAuthLogin, ActionAuthRefresh, ActionAuthLogout} from "./auth.action";

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

  @Action(ActionAuthLogin)
  login({ patchState }: StateContext<AuthStateModel>, { payload }: ActionAuthLogin): Observable<string> {
    return this.authService.login(payload).pipe(
      tap(token => {
        patchState({
          token,
          username: payload.username
        });
      })
    );
  }

  @Action(ActionAuthRefresh)
  refresh({ patchState }: StateContext<AuthStateModel>): Observable<string> {
    return this.authService.refresh().pipe(
      tap(token => {
        patchState({
          token
        });
      })
    );
  }

  @Action(ActionAuthLogout)
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

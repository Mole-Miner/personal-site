import { LoginDto } from "../../services";

export class ActionAuthLogin {
  static readonly type = '[Auth] Login';

  constructor(public payload: LoginDto) {
  }
}

export class ActionAuthRefresh {
  static readonly type = '[Auth] Refresh';
}

export class ActionAuthLogout {
  static readonly type = '[Auth] Logout';
}

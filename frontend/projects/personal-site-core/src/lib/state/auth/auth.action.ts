import { LoginDto } from "../../services/auth.service";

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: LoginDto) {
  }
}

export class Refresh {
  static readonly type = '[Auth] Refresh';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

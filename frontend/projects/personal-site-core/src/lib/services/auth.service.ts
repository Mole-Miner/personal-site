import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from "../tokens/api-url";

export type LoginDto = {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  private readonly url: string;

  constructor(@Inject(API_URL) private readonly api: string, private readonly httpClient: HttpClient) {
    this.url = `${ api }/auth`;
  }

  login(loginDto: LoginDto): Observable<string> {
    return this.httpClient.post<string>(`${ this.url }/login`, loginDto);
  }

  refresh(): Observable<string> {
    return this.httpClient.post<string>(`${ this.url }/refresh`, null);
  }

  logout(): Observable<null> {
    return this.httpClient.post<null>(`${ this.url }/logout`, null);
  }
}

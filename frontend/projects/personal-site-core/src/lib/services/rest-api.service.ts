import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from "../tokens";

export class RestApiService {
  private readonly httpClient: HttpClient;
  private readonly url: string;

  constructor(feature: string) {
    this.httpClient = inject(HttpClient);
    const api = inject(API_URL);
    this.url = `${ api }/${ feature }`;
  }

  protected get<Response>(id: string = ''): Observable<Response> {
    const url = `${ this.url }${ id ? `/${ id }` : '' }`;
    return this.httpClient.get<Response>(url);
  }

  protected post<Body, Response>(body: Body): Observable<Response> {
    return this.httpClient.post<Response>(this.url, body);
  }

  protected patch<Body, Response>(id: string, body: Body): Observable<Response> {
    return this.httpClient.patch<Response>(`${ this.url }/${ id }`, body);
  }

  protected delete<Response>(id: string): Observable<Response> {
    return this.httpClient.delete<Response>(`${ this.url }/${ id }`);
  }
}

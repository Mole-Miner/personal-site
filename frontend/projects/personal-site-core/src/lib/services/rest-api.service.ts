import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from "../tokens";
import { EntityTypes } from "../types";

export class RestApiService<T extends EntityTypes.BaseEntity = EntityTypes.BaseEntity> {
  protected readonly httpClient: HttpClient;
  protected readonly url: string;

  constructor(feature: string) {
    this.httpClient = inject(HttpClient);
    const api = inject(API_URL);
    this.url = `${ api }/${ feature }`;
  }

  protected findMany(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  protected findOne(args: EntityTypes.FindEntity): Observable<T> {
    return this.httpClient.get<T>(`${ this.url }/${ args.where.id }`);
  }

  protected create(args: EntityTypes.CreateEntity<T>): Observable<T> {
    return this.httpClient.post<T>(this.url, args.data);
  }

  protected update(args: EntityTypes.UpdateEntity<T>): Observable<T> {
    return this.httpClient.patch<T>(`${ this.url }/${ args.where.id }`, args.data);
  }

  protected delete(args: EntityTypes.DeleteEntity): Observable<T> {
    return this.httpClient.delete<T>(`${ this.url }/${ args.where.id }`);
  }
}

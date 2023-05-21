import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from "../tokens";
import { EntityTypes } from "../types";

@Injectable()
export class RestApiService<T extends EntityTypes.BaseEntity = EntityTypes.BaseEntity> {
  private readonly httpClient: HttpClient;
  private readonly url: string;

  constructor(feature: string) {
    this.httpClient = inject(HttpClient);
    const api = inject(API_URL);
    this.url = `${ api }/${ feature }`;
  }

  protected findMany(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  protected findOne({ where }: EntityTypes.FindEntity): Observable<T> {
    return this.httpClient.get<T>(`${ this.url }/${ where.id }`);
  }

  protected create({ data }: EntityTypes.CreateEntity<T>): Observable<T> {
    return this.httpClient.post<T>(this.url, data);
  }

  protected update({ where, data }: EntityTypes.UpdateEntity<T>): Observable<T> {
    return this.httpClient.patch<T>(`${ this.url }/${ where.id }`, data);
  }

  protected delete({ where }: EntityTypes.DeleteEntity): Observable<T> {
    return this.httpClient.delete<T>(`${ this.url }/${ where.id }`);
  }
}

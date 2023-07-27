import { inject } from "@angular/core";
import { HttpClient, HttpParams, HttpParamsOptions } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_URL } from "../tokens";
import { EntityTypes } from "../types";

export abstract class AbstractApiService<T extends EntityTypes.BaseEntity = EntityTypes.BaseEntity> {
  protected readonly httpClient: HttpClient;
  protected readonly url: string;

  protected constructor(feature: string) {
    this.httpClient = inject(HttpClient);
    const api = inject(API_URL);
    this.url = `${ api }/${ feature }`;
  }

  protected findMany(options?: HttpParamsOptions): Observable<T[]> {
    const params = new HttpParams(options);
    return this.httpClient.get<T[]>(this.url, { params });
  }

  protected findOne(args: EntityTypes.FindEntity, options?: HttpParamsOptions): Observable<T> {
    const params = new HttpParams(options);
    return this.httpClient.get<T>(`${ this.url }/${ args.where.id }`, { params });
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

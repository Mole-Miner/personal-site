import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";

import { AuthService } from "./services";
import { API_URL } from "./tokens";
import { AuthState } from "./state";
import { authInterceptor } from "./interceptors/auth.interceptor";

@NgModule({
  imports: [
    HttpClientModule,
    NgxsModule.forRoot([AuthState]),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    })
  ],
  providers: [
    {
      provide: API_URL,
      useValue: 'http://localhost:3000/api/v1'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptor,
      multi: true
    },
    AuthService
  ],
  exports: [
    NgxsModule,
    NgxsStoragePluginModule
  ]
})
export class PersonalSiteCoreModule { }

import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";

import { AuthService } from "./services";
import { API_URL } from "./tokens";
import { AuthState } from "./state";

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
    AuthService
  ],
  exports: [
    NgxsModule,
    NgxsStoragePluginModule
  ]
})
export class PersonalSiteCoreModule { }

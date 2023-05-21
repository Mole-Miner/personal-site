import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { API_URL } from "./tokens";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75
    })
  ],
  providers: [
    {
      provide: API_URL,
      useValue: 'http://localhost:3000/api/v1'
    }
  ],
  exports: [ StoreDevtoolsModule ]
})
export class PersonalSiteCoreModule {
}

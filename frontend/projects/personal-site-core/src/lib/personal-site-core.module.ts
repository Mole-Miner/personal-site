import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { API_URL } from "./tokens";
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: API_URL,
      useValue: 'http://localhost:3000/api/v1'
    }
  ]
})
export class PersonalSiteCoreModule { }

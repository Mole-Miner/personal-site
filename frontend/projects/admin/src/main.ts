import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { PersonalSiteCoreModule } from 'personal-site-core';

import { AppComponent } from "./app/app.component";
import { appRoutes } from "./app/routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      PersonalSiteCoreModule
    )
  ]
})
  .catch(err => console.error(err));

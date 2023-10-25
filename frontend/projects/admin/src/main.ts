import { bootstrapApplication } from "@angular/platform-browser";
import { importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthService, PersonalSiteCoreModule } from 'personal-site-core';

import { AppComponent } from "./app/app.component";
import { appRoutes } from "./app/routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      PersonalSiteCoreModule,
    ),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useValue: authInterceptor,
    //   multi: true
    // },
    AuthService
  ]
})
  .catch(err => console.error(err));

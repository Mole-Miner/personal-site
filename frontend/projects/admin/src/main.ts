import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { importProvidersFrom } from "@angular/core";

import { AppComponent } from "./app/app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
    )
  ]
})
  .catch(err => console.error(err));

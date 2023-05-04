import { NgModule } from '@angular/core';
import { PersonalSiteMaterialModule } from "personal-site-material";

import { LayoutComponent } from "./layout/layout.component";

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    PersonalSiteMaterialModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class ComponentsModule { }

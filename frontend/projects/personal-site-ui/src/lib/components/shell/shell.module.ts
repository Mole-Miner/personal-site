import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import shellRoutes from "./routes";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(shellRoutes)
  ],
  exports: [RouterModule]
})
export class ShellModule { }

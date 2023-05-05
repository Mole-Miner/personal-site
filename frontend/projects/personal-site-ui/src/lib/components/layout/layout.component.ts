import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

import { PersonalSiteMaterialModule } from "personal-site-material";

@Component({
  selector: 'ui-layout',
  standalone: true,
  imports: [CommonModule, PersonalSiteMaterialModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  readonly routes = ['about', 'news', 'experience'];
}

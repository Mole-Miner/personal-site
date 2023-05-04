import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";

import { PersonalSiteMaterialModule } from "personal-site-material";

@Component({
  selector: 'ui-layout',
  standalone: true,
  imports: [CommonModule, PersonalSiteMaterialModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}

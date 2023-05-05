import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";

import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'ui-shell',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, LayoutComponent ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

}

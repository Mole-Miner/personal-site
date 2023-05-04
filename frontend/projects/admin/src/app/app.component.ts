import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "personal-site-ui";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, ComponentsModule]
})
export class AppComponent {
  title = 'admin';
}

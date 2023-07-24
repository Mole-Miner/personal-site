import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";

import { Experience, ExperienceService } from "personal-site-core";

import { EditorComponent } from "../editor/editor.component";
import { ExperienceEditorDialogComponent } from "./experience-editor-dialog/experience-editor-dialog.component";

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ CommonModule, EditorComponent ],
  templateUrl: './experience.component.html',
  styleUrls: [ './experience.component.scss' ]
})
export class ExperienceComponent implements OnInit {
  experienceList!: Experience[];
  readonly tableColumns = [ 'position', 'start', 'end' ];
  readonly experienceEditorDialog: Type<ExperienceEditorDialogComponent> = ExperienceEditorDialogComponent;

  constructor(private readonly experienceService: ExperienceService) {
  }

  ngOnInit(): void {

  }

  onCreateExperience(experience: Experience) {
    console.log(experience);
  }

  onUpdateExperience(experience: Experience) {
  }

  onDeleteExperience(experience: Experience) {
  }

  private findExperienceList() {
  }
}

import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesService, Company, Experience, ExperienceService } from "personal-site-core";

import { EditorComponent, EditorTableColumns } from "../editor/editor.component";
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

  readonly tableColumns: EditorTableColumns = {
    columns: [ 'position', 'start', 'end' ],
    isDateColumns: false
  };
  readonly experienceEditorDialog: Type<ExperienceEditorDialogComponent> = ExperienceEditorDialogComponent;

  constructor(private readonly experienceService: ExperienceService) {
  }

  ngOnInit(): void {
    this.findExperienceList();
  }

  onCreateExperience(experience: Experience) {
    console.log(experience);
  }

  onUpdateExperience(experience: Experience) {
  }

  onDeleteExperience(experience: Experience) {
  }

  private findExperienceList(): void {
    this.experienceService.findExperienceList().subscribe((experienceList) => {
      this.experienceList = experienceList;
    });
  }
}

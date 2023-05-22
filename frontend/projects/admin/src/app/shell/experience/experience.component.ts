import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { ExperienceTypes, ExperienceState, ExperiencePageActions, ExperienceSelectors  } from "personal-site-core";

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
  readonly experienceList$: Observable<ExperienceTypes.Experience[]> = this.store.select(ExperienceSelectors.selectExperienceList);
  readonly tableColumns = [ 'position', 'start', 'end' ];

  readonly experienceEditorDialog: Type<ExperienceEditorDialogComponent> = ExperienceEditorDialogComponent;

  constructor(private readonly store: Store<ExperienceState>) {
  }

  ngOnInit() {
    this.findExperienceList();
  }

  onCreateExperience(experience: ExperienceTypes.CreateExperience) {
    console.log(experience);
    this.store.dispatch(ExperiencePageActions.createExperience({ payload: experience }));
  }

  onUpdateExperience(experience: ExperienceTypes.UpdateExperience) {
    // this.store.dispatch(ExperiencePageActions.updateExperience({ payload: experience }));
  }

  onDeleteExperience(experience: ExperienceTypes.Experience) {
    // this.store.dispatch(ExperiencePageActions.deleteExperience({ payload: { where: { id: experience.id } } }));
  }

  private findExperienceList() {
    this.store.dispatch(ExperiencePageActions.loadExperienceList());
  }
}

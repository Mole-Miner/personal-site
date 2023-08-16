import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { Accomplishment, Experience, ExperienceService } from "personal-site-core";
import { DialogBodyTemplateDirective, DialogComponent, DialogHeaderTemplateDirective } from "personal-site-ui";
import { PersonalSiteMaterialModule } from "personal-site-material";


import { AbstractEditorDialog } from "../../editor/abstract-editor-dialog";

@Component({
  selector: 'app-accomplishment-editor-dialog',
  standalone: true,
  imports: [ CommonModule,
    PersonalSiteMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogComponent,
    DialogHeaderTemplateDirective,
    DialogBodyTemplateDirective
  ],
  templateUrl: './accomplishment-editor-dialog.component.html',
  styleUrls: [ './accomplishment-editor-dialog.component.scss' ]
})
export class AccomplishmentEditorDialogComponent extends AbstractEditorDialog<Accomplishment> implements OnInit {
  experienceList!: Experience[];

  constructor(private readonly experienceService: ExperienceService, private readonly cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.findExperienceList();
    this.setupForm();
  }

  setupForm(): void {
    this.form.setControl('experienceId', new FormControl(null, [ Validators.required ]));
    this.form.setControl('content', new FormControl(null, [ Validators.required ]));
    if (this.isUpdate) {
      this.form.setControl('id', new FormControl({ value: null, disabled: true }));
      this.form.setValue({
        id: this.entity?.id,
        content: this.entity?.content,
        experienceId: this.entity?.experienceId
      });
    }
  }

  findExperienceList(): void {
    this.experienceService.findExperienceList().subscribe((experienceList) => {
      this.experienceList = experienceList;
      this.cdr.detectChanges();
    });
  }
}

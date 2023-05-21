import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { PersonalSiteMaterialModule } from 'personal-site-material';
import { CompaniesTypes } from "personal-site-core";
import { DialogBodyTemplateDirective, DialogComponent, DialogHeaderTemplateDirective } from "personal-site-ui";

import { AbstractEditorDialog } from "../../editor/abstract-editor-dialog";

@Component({
  selector: 'app-company-editor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    PersonalSiteMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogComponent,
    DialogHeaderTemplateDirective,
    DialogBodyTemplateDirective
  ],
  templateUrl: './company-editor-dialog.component.html',
  styleUrls: [ './company-editor-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyEditorDialogComponent extends AbstractEditorDialog<CompaniesTypes.Company> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.form.setControl('name', new FormControl(null, [ Validators.required ]));
    this.form.setControl('preview', new FormControl(null, [ Validators.required ]));
    if (this.isUpdate) {
      this.form.setControl('id', new FormControl({ value: null, disabled: true }));
      this.form.setValue({
        id: this.entity?.id,
        name: this.entity?.name,
        preview: this.entity?.preview
      });
    }
  }
}

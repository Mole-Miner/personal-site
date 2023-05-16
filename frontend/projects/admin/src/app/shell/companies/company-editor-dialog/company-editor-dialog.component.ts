import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { MAT_DIALOG_DATA, MatDialogRef, PersonalSiteMaterialModule } from 'personal-site-material';
import { CompaniesTypes } from "personal-site-core";
import { DialogComponent, DialogHeaderTemplateDirective, DialogBodyTemplateDirective } from "personal-site-ui";

export interface CompanyEditorData {
  action: 'create' | 'edit';
  company: CompaniesTypes.Company | null;
}

export type CompanyEditorResult = CompaniesTypes.CreateCompany | CompaniesTypes.UpdateCompany;

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
export class CompanyEditorDialogComponent implements OnInit {
  companyForm!: FormGroup;

  isInteract = false;
  isCreation = this.data.action === 'create';
  isEdition = this.data.action === 'edit';

  constructor(
    private readonly dialogRef: MatDialogRef<CompanyEditorDialogComponent, CompanyEditorResult>,
    @Inject(MAT_DIALOG_DATA) public readonly data: CompanyEditorData
  ) {
  }

  ngOnInit() {
    this.initCompanyForm();
    this.beginInteraction();
  }

  onSave() {
    const result = this.companyForm.getRawValue();
    if (this.isCreation) {
      this.endInteraction(result as CompaniesTypes.CreateCompany);
    } else {
      this.endInteraction(result as CompaniesTypes.UpdateCompany);
    }
  }

  onCancel() {
    this.endInteraction();
  }

  onClose() {
    this.endInteraction();
  }

  private setIsInteract(value: boolean) {
    this.isInteract = value;
  }

  private initCompanyForm() {
    this.companyForm = new FormGroup({
      name: new FormControl(null, [ Validators.required ]),
      preview: new FormControl(null, [ Validators.required ])
    });
    if (this.isEdition) {
      this.companyForm.addControl('id', new FormControl({ value: null, disabled: true }));
      this.companyForm.setValue({
        id: this.data.company?.id,
        name: this.data.company?.name,
        preview: this.data.company?.preview
      });
    }
  }

  private beginInteraction() {
    this.setIsInteract(true);
  }

  private endInteraction(result?: CompanyEditorResult) {
    this.setIsInteract(false);
    this.dialogRef.close(result);
  }
}

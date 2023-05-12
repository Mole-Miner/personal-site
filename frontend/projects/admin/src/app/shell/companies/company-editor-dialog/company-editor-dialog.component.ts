import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import {
  MAT_DIALOG_DATA,
  MatButtonModule,
  MatDialogRef,
  MatFormFieldModule,
  MatInputModule
} from 'personal-site-material';
import { CompaniesTypes } from "personal-site-core";

export interface CompanyEditorData {
  action: 'create' | 'edit';
  company: CompaniesTypes.Company | null;
}

export type CompanyEditorResult = CompaniesTypes.CreateCompany | CompaniesTypes.UpdateCompany;

@Component({
  selector: 'app-company-editor-dialog',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule ],
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
  ) {}

  ngOnInit() {
    this.initCompanyForm();
    this.checkInteraction();
  }

  onEdit() {
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

  private checkInteraction() {
    if (this.isCreation) {
      this.beginInteraction();
    }
  }

  private setIsInteract(value: boolean) {
    this.isInteract = value;
  }

  private initCompanyForm() {
    this.companyForm = new FormGroup({
      name: new FormControl({ value: null, disabled: true }, [ Validators.required ]),
      preview: new FormControl({ value: null, disabled: true }, [ Validators.required ])
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

  private interactCompanyForm(flag: boolean) {
    [ this.companyForm.get('name'), this.companyForm.get('preview') ].forEach(control => {
      if (flag) {
        control?.enable();
      } else {
        control?.disable();
      }
    });
  }

  private beginInteraction() {
    this.interactCompanyForm(true);
    this.setIsInteract(true);
  }

  private endInteraction(result?: CompanyEditorResult) {
    this.interactCompanyForm(false);
    this.setIsInteract(false);
    this.dialogRef.close(result);
  }
}

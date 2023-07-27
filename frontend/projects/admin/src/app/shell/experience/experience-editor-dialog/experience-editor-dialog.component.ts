import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

import { Company, Experience, CompaniesService } from "personal-site-core";
import { PersonalSiteMaterialModule } from 'personal-site-material';
import { DialogBodyTemplateDirective, DialogComponent, DialogHeaderTemplateDirective } from 'personal-site-ui';

import { AbstractEditorDialog } from "../../editor/abstract-editor-dialog";

@Component({
  selector: 'app-experience-editor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    PersonalSiteMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogComponent,
    DialogHeaderTemplateDirective,
    DialogBodyTemplateDirective,
  ],
  templateUrl: './experience-editor-dialog.component.html',
  styleUrls: [ './experience-editor-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceEditorDialogComponent extends AbstractEditorDialog<Experience> implements OnInit, OnDestroy {
  @Input()
  companies!: Company[];

  constructor(private readonly companiesService: CompaniesService) {
    super();
  }

  ngOnInit() {
    this.findCompanies();
    this.setupForm();
  }

  ngOnDestroy() {
  }

  setupForm(): void {
    this.form.setControl('position', new FormControl(null, [ Validators.required ]));
    this.form.setControl('start', new FormControl(null, [ Validators.required ]));
    this.form.setControl('end', new FormControl(null, [ Validators.required ]));
    this.form.setControl('companyId', new FormControl(null, [ Validators.required ]));
    if (this.isUpdate) {
      this.form.setControl('id', new FormControl(null, [ Validators.required ]));
    }
  }

  private findCompanies(): void {
    this.companiesService.findCompanies().subscribe((companies) => {
      console.log(companies);
    });
  }
}

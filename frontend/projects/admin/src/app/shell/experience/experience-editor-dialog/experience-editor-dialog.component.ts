import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { forkJoin } from "rxjs";

import { Accomplishment, AccomplishmentsService, CompaniesService, Company, Experience } from "personal-site-core";
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
export class ExperienceEditorDialogComponent extends AbstractEditorDialog<Experience> implements OnInit {
  companies!: Company[];
  accomplishments!: Accomplishment[];

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly accomplishmentsService: AccomplishmentsService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.loadData();
    this.setupForm();
  }

  setupForm(): void {
    this.form.setControl('position', new FormControl(null, [ Validators.required ]));
    this.form.setControl('start', new FormControl(null, [ Validators.required ]));
    this.form.setControl('end', new FormControl(null, [ Validators.required ]));
    this.form.setControl('companyId', new FormControl(null, [ Validators.required ]));
    if (this.isUpdate) {
      this.form.setControl('id', new FormControl({ value: null, disabled: true }, [ Validators.required ]));
      this.form.setValue({
        id: this.entity?.id,
        position: this.entity?.position,
        start: this.entity?.start,
        end: this.entity?.end,
        companyId: this.entity?.companyId
      });
    }
  }

  private loadData(): void {
    forkJoin([
      this.companiesService.findCompanies(),
      this.accomplishmentsService.findAccomplishments()
    ]).subscribe(([ companies, accomplishments ]) => {
      this.companies = companies;
      this.accomplishments = accomplishments;
      this.cdr.detectChanges();
    })
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { CompaniesPageActions, CompaniesSelectors, CompaniesState, CompaniesTypes } from "personal-site-core";
import { MatDialog, MatDialogRef, PersonalSiteMaterialModule } from "personal-site-material";

import {
  CompanyEditorData,
  CompanyEditorDialogComponent,
  CompanyEditorResult
} from "./company-editor-dialog/company-editor-dialog.component";

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [ CommonModule, PersonalSiteMaterialModule ],
  templateUrl: './companies.component.html',
  styleUrls: [ './companies.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent implements OnInit {
  readonly companies$: Observable<CompaniesTypes.Company[]> = this.store.select(CompaniesSelectors.selectCompanies);
  readonly tableColumns = [ 'name', 'createdAt', 'updatedAt', 'deletedAt' ];

  constructor(private readonly store: Store<CompaniesState>, private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(CompaniesPageActions.findCompanies());
  }

  onCreateTableRow() {
    this.openCompanyEditor('create', null);
  }

  onClickTableRow(company: CompaniesTypes.Company) {
    this.openCompanyEditor('edit', company);
  }

  private openCompanyEditor(action: 'create' | 'edit', company: CompaniesTypes.Company | null) {
    const companyEditorRef: MatDialogRef<CompanyEditorDialogComponent, CompanyEditorResult> = this.dialog.open(
      CompanyEditorDialogComponent,
      {
        data: {
          action,
          company
        } as CompanyEditorData
      }
    );
    companyEditorRef.afterClosed().subscribe(company => {
      if (!company) {
        return;
      }
      if (action === 'create') {
        this.store.dispatch(CompaniesPageActions.createCompany(company as CompaniesTypes.CreateCompany));
      } else {
        this.store.dispatch(CompaniesPageActions.updateCompany(company as CompaniesTypes.UpdateCompany));
      }
    });
  }
}

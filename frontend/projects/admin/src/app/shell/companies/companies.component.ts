import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { CompaniesPageActions, CompaniesSelectors, CompaniesState, CompaniesTypes } from "personal-site-core";

import { EditorComponent } from "../editor/editor.component";
import { CompanyEditorDialogComponent } from "./company-editor-dialog/company-editor-dialog.component";

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [ CommonModule, EditorComponent ],
  templateUrl: './companies.component.html',
  styleUrls: [ './companies.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent implements OnInit {
  readonly companies$: Observable<CompaniesTypes.Company[]> = this.store.select(CompaniesSelectors.selectCompanies);
  readonly tableColumns = [ 'name' ];

  readonly companyEditorDialog: Type<CompanyEditorDialogComponent> = CompanyEditorDialogComponent;

  constructor(private readonly store: Store<CompaniesState>) {
  }

  ngOnInit() {
    this.findCompanies();
  }

  onCreateCompany(company: CompaniesTypes.CreateCompany) {
    this.store.dispatch(CompaniesPageActions.createCompany({ payload: company }));
  }

  onUpdateCompany(company: CompaniesTypes.UpdateCompany) {
    this.store.dispatch(CompaniesPageActions.updateCompany({ payload: company }));
  }

  onDeleteCompany(company: CompaniesTypes.Company) {
    this.store.dispatch(CompaniesPageActions.deleteCompany({ payload: { id: company.id } }))
  }

  private findCompanies() {
    this.store.dispatch(CompaniesPageActions.loadCompanies());
  }
}

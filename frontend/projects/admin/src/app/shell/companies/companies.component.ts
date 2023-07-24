import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesService, Company } from "personal-site-core";

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
  companies!: Company[];
  readonly tableColumns = [ 'id', 'name' ];
  readonly companyEditorDialog: Type<CompanyEditorDialogComponent> = CompanyEditorDialogComponent;

  constructor(private readonly companiesService: CompaniesService, private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  onCreateCompany(company: Company): void {
    this.companiesService.createCompany(company).subscribe(() => this.loadCompanies());
  }

  onUpdateCompany(company: Company): void {
    this.companiesService.updateCompany(company).subscribe(() => this.loadCompanies());
  }

  onDeleteCompany(company: Company): void {
    this.companiesService.deleteCompany(company.id).subscribe(() => this.loadCompanies());
  }

  private loadCompanies(): void {
    this.companiesService.findCompanies().subscribe(companies => {
      this.companies = companies;
      this.cdr.detectChanges();
    });
  }
}

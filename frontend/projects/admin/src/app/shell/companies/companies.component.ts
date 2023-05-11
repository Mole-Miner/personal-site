import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { CompaniesState, CompaniesSelectors, CompaniesTypes, CompaniesPageActions } from "personal-site-core";

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './companies.component.html',
  styleUrls: [ './companies.component.scss' ]
})
export class CompaniesComponent implements OnInit {
  readonly companies$: Observable<CompaniesTypes.Company[]> = this.store.select(CompaniesSelectors.selectCompanies);

  constructor(private readonly store: Store<CompaniesState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(CompaniesPageActions.findCompanies());
  }
}

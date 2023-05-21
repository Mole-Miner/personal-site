import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditorDialogComponent } from './company-editor-dialog.component';

describe('CompanyComponent', () => {
  let component: CompanyEditorDialogComponent;
  let fixture: ComponentFixture<CompanyEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CompanyEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishmentEditorDialogComponent } from './accomplishment-editor-dialog.component';

describe('AccomplishmentEditorDialogComponent', () => {
  let component: AccomplishmentEditorDialogComponent;
  let fixture: ComponentFixture<AccomplishmentEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AccomplishmentEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccomplishmentEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

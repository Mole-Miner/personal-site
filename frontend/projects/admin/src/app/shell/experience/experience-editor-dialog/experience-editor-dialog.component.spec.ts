import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceEditorDialogComponent } from './experience-editor-dialog.component';

describe('ExperienceEditorDialogComponent', () => {
  let component: ExperienceEditorDialogComponent;
  let fixture: ComponentFixture<ExperienceEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExperienceEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

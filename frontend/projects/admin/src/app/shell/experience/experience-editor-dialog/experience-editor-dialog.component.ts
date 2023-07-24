import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

import { Company, Experience } from "personal-site-core";
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
  imageSource!: string;
  companies!: Company[];

  private image!: File;
  private readonly destroy$ = new Subject<void>();

  constructor() {
    super();
  }

  ngOnInit() {
    console.log(this.entity);
    this.loadCompanies();
    this.setupForm();
  }

  ngOnDestroy() {
    if (this.imageSource) {
      URL.revokeObjectURL(this.imageSource);
    }
    this.destroy$.next();
    this.destroy$.complete();
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

  onSelectImage(event: Event) {
    const files = ((event.target) as HTMLInputElement).files;
    if (files) {
      this.image = files[0];
      this.imageSource = URL.createObjectURL(this.image);
    }
  }

  override async onSave() {
    const fileAsBase64 = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onloadend = function () {
          resolve(fileReader.result as string);
        }
        fileReader.readAsDataURL(file);
      });
    };

    const img = await this.image.arrayBuffer();
    const formData = this.form.getRawValue() as any;

    console.log(new Uint8Array(img));

    // const result = {
    //   data: {
    //     position: formData.position,
    //     start: new Date(formData.start).toISOString(),
    //     end: new Date(formData.end).toISOString(),
    //     companyId: formData.companyId,
    //     image: {
    //       name: this.image.name,
    //       type: this.image.type,
    //       data: new Int32Array(img)
    //     }
    //   }
    // } as ExperienceTypes.CreateExperience;

    this.close();
  }

  private loadCompanies() {

  }
}

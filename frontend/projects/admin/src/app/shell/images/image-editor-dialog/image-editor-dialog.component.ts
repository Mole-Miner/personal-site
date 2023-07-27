import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { Base64UrlImage } from "personal-site-core";
import { PersonalSiteMaterialModule } from "personal-site-material";
import { DialogBodyTemplateDirective, DialogComponent, DialogHeaderTemplateDirective } from "personal-site-ui";

import { AbstractEditorDialog } from "../../editor/abstract-editor-dialog";

@Component({
  selector: 'app-image-editor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    PersonalSiteMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogComponent,
    DialogHeaderTemplateDirective,
    DialogBodyTemplateDirective
  ],
  templateUrl: './image-editor-dialog.component.html',
  styleUrls: [ './image-editor-dialog.component.scss' ]
})
export class ImageEditorDialogComponent extends AbstractEditorDialog<Base64UrlImage> implements OnInit, OnDestroy {
  @ViewChild('fileChooser', { static: false })
  readonly fileChooser!: ElementRef<HTMLInputElement>;

  image!: File;
  imageSource!: string;

  ngOnInit(): void {
    this.setupForm();
  }

  ngOnDestroy(): void {
    if (this.imageSource) {
      URL.revokeObjectURL(this.imageSource);
    }
  }

  setupForm(): void {
    this.form.setControl('name', new FormControl({ value: null, disabled: true }));
    this.form.setControl('type', new FormControl({ value: null, disabled: true }));
    if (this.isUpdate) {
      this.form.setControl('id', new FormControl({ value: null, disabled: true }));
      this.form.setValue({
        id: this.entity?.id,
        name: this.entity?.name,
        type: this.entity?.type
      });
    }
  }

  selectFile(): void {
    this.fileChooser.nativeElement.click();
  }

  onSelectFile(event: Event): void {
    const image = (event.target as HTMLInputElement).files![0];
    this.image = image;
    this.imageSource = URL.createObjectURL(image);
    this.form.patchValue({
      name: image.name,
      type: image.type,
    });
  }

  override onSave(): void {
    super.close(this.image);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

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
export class ImageEditorDialogComponent extends AbstractEditorDialog<Base64UrlImage> implements OnInit {
  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.form.setControl('name', new FormControl(null, [ Validators.required ]));
    this.form.setControl('type', new FormControl(null, [ Validators.required ]));
    if (this.isUpdate) {
      this.form.setControl('id', new FormControl({ value: null, disabled: true }));
      this.form.setValue({
        id: this.entity?.id,
        name: this.entity?.name,
        type: this.entity?.type
      });
    }
  }
}

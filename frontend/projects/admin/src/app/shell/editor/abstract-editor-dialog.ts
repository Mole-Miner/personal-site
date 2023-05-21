import { inject, Injectable } from "@angular/core";

import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { BaseEntity } from 'personal-site-core';

export interface EditorDialogData<T> {
  action: 'create' | 'update';
  entity?: T;
}

@Injectable()
export abstract class AbstractEditorDialog<T extends BaseEntity = BaseEntity, R = any> {
  private readonly dialogRef: MatDialogRef<AbstractEditorDialog, R> = inject(MatDialogRef);
  private readonly data: EditorDialogData<T> = inject(MAT_DIALOG_DATA);

  protected readonly form = new FormGroup({});
  protected readonly entity = this.data.entity;
  protected readonly isUpdate = this.data.action === 'update';

  abstract setupForm(): void;

  protected onSave() {
    this.close(this.form.getRawValue() as R);
  }

  protected onCancel() {
    this.close();
  }

  protected onClose() {
    this.close();
  }

  private close(result?: R) {
    this.dialogRef.close(result)
  }
}

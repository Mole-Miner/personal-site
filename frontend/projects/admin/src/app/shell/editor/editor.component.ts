import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";

import { BaseEntity } from "personal-site-core";
import { PersonalSiteMaterialModule, MatDialog, MatDialogRef } from "personal-site-material";

import { EditorDialogComponent } from "./editor-dialog/editor-dialog.component";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [ CommonModule, PersonalSiteMaterialModule, EditorDialogComponent ],
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.scss' ]
})
export class EditorComponent<T extends BaseEntity = BaseEntity> {
  @Input()
  set dataSource(source$: Observable<T[]>) {
    this.source$ = source$;
  }

  @Input()
  set displayedColumns(columns: string[]) {
    this.columns = [ ...columns, 'createdAt', 'updatedAt', 'deletedAt' ];
  }

  @Input()
  title = 'Editor';

  @Output()
  create = new EventEmitter();

  @Output()
  update = new EventEmitter();

  source$!: Observable<T[]>;
  columns!: string[];

  constructor(private readonly dialog: MatDialog) {
  }

  onAddTableRow() {
    this.openEditorDialog('create', null);
  }

  onClickTableRow(row: T) {
    this.openEditorDialog('edit', row);
  }

  private openEditorDialog(action: 'create' | 'edit', payload: T | null) {
    const dialogRef: MatDialogRef<EditorDialogComponent> = this.dialog.open(EditorDialogComponent, {
      data: {
        action,
        payload
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (action === 'create') {
        this.create.emit(result);
      } else {
        this.update.emit(result);
      }
    });
  }
}

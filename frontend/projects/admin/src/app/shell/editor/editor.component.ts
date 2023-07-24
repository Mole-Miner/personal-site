import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";

import { EntityTypes } from "personal-site-core";
import { MatDialog, PersonalSiteMaterialModule } from "personal-site-material";

import { AbstractEditorDialog, EditorDialogData } from "./abstract-editor-dialog";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [ CommonModule, PersonalSiteMaterialModule ],
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent<T extends EntityTypes.BaseEntity = EntityTypes.BaseEntity> {
  @Input()
  editorDialog!: Type<AbstractEditorDialog<T>>;

  @Input()
  dataSource!: T[];

  @Input()
  set displayedColumns(columns: string[]) {
    this.columns = [ ...columns, 'createdAt', 'updatedAt', 'deletedAt' ];
    this.columnsWithMenu = [ ...this.columns, 'menu' ];
  }

  @Input()
  title = 'Editor';

  @Output()
  create = new EventEmitter();

  @Output()
  update = new EventEmitter();

  @Output()
  delete = new EventEmitter();


  columns!: string[];
  columnsWithMenu!: string[];

  constructor(private readonly dialog: MatDialog) {
  }

  onAddTableRow() {
    this.openEditorDialog({ action: 'create' });
  }

  onClickTableRow(row: T) {
    this.openEditorDialog({ action: 'update', entity: row });
  }

  onDeleteTableRow(row: T) {
    this.delete.emit(row);
  }

  private openEditorDialog(data: EditorDialogData<T>) {
    const dialogRef = this.dialog.open(this.editorDialog, { data });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (data.action === 'create') {
        this.create.emit(result);
      } else {
        this.update.emit(result);
      }
    });
  }
}

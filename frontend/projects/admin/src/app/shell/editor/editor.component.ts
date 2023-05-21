import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";

import { BaseEntity } from "personal-site-core";
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
export class EditorComponent<T extends BaseEntity = BaseEntity> {
  @Input()
  editorDialog!: Type<AbstractEditorDialog<T>>;

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
    this.openEditorDialog({ action: 'create' });
  }

  onClickTableRow(row: T) {
    this.openEditorDialog({ action: 'update', entity: row });
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

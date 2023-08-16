import { ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccomplishmentsService, Accomplishment } from "personal-site-core";

import { EditorComponent, EditorTableColumns } from "../editor/editor.component";
import {
  AccomplishmentEditorDialogComponent
} from "./accomplishment-editor-dialog/accomplishment-editor-dialog.component";

@Component({
  selector: 'app-accomplishments',
  standalone: true,
  imports: [ CommonModule, EditorComponent ],
  templateUrl: './accomplishments.component.html',
  styleUrls: ['./accomplishments.component.scss']
})
export class AccomplishmentsComponent implements OnInit {
  accomplishments!: Accomplishment[];
  readonly tableColumns: EditorTableColumns = {
    columns: [ 'experienceId', 'content' ],
    isDateColumns: false
  };
  readonly accomplishmentEditorDialog: Type<AccomplishmentEditorDialogComponent> = AccomplishmentEditorDialogComponent;

  constructor(private readonly accomplishmentsService: AccomplishmentsService, private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadAccomplishments();
  }

  onCreateAccomplishment(accomplishment: Accomplishment): void {
    this.accomplishmentsService.createAccomplishment(accomplishment).subscribe(() => this.loadAccomplishments());
  }

  onUpdateAccomplishment(accomplishment: Accomplishment): void {
    this.accomplishmentsService.updateAccomplishment(accomplishment).subscribe(() => this.loadAccomplishments());
  }

  onDeleteAccomplishment(accomplishment: Accomplishment): void {
    this.accomplishmentsService.deleteAccomplishment(accomplishment.id).subscribe(() => this.loadAccomplishments());
  }

  private loadAccomplishments(): void {
    this.accomplishmentsService.findAccomplishments().subscribe((accomplishments) => {
      this.accomplishments = accomplishments;
      this.cdr.detectChanges();
    })
  }
}

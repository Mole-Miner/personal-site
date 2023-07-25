import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Base64UrlImage, ImagesService } from "personal-site-core";
import { EditorComponent, EditorTableColumns } from "../editor/editor.component";
import { ImageEditorDialogComponent } from "./image-editor-dialog/image-editor-dialog.component";

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [ CommonModule, EditorComponent ],
  templateUrl: './images.component.html',
  styleUrls: [ './images.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit {
  images!: Base64UrlImage[];
  readonly tableColumns: EditorTableColumns = {
    columns: ['id', 'name', 'type'],
    isDateColumns: false
  };
  readonly imageEditorDialog: Type<ImageEditorDialogComponent> = ImageEditorDialogComponent;

  constructor(private readonly imagesService: ImagesService, private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadImages();
  }

  private loadImages(): void {
    this.imagesService.downloadImages().subscribe((images) => {
      this.images = images;
      this.cdr.detectChanges();
    });
  }
}

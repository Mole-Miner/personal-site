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
    this.findImages();
  }

  onCreateImage(image: File): void {
    this.imagesService.createImage(image).subscribe(() => this.findImages());
  }

  onDeleteImage(image: Base64UrlImage): void {
    this.imagesService.deleteImage(image.id).subscribe(() => this.findImages());
  }

  private findImages(): void {
    this.imagesService.findImages().subscribe((images) => {
      this.images = images;
      this.cdr.detectChanges();
    });
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Base64UrlImage, ImagesService } from "personal-site-core";
import { concatAll, map } from "rxjs";

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './images.component.html',
  styleUrls: [ './images.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit {
  images!: Base64UrlImage[];

  constructor(private readonly imagesService: ImagesService, private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadImages();
  }

  private loadImages(): void {
    this.imagesService
      .downloadImages()
      .pipe(
        concatAll(),
        map((image: any) => {
          console.log(image.stream.getReader());
          return image;
        }),
      )
      .subscribe((images) => {
        // this.images = images;
        // this.cdr.detectChanges();
        // console.log(this.images);
      });
  }
}

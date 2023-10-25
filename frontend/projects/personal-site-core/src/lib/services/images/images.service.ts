import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { AbstractApiService } from "../api.service";
import { Image, Base64UrlImage } from "../../types";

@Injectable()
export class ImagesService extends AbstractApiService<Image> {

  constructor() {
    super('images');
  }

  findImages(): Observable<Base64UrlImage[]> {
    return this.httpClient.get<Base64UrlImage[]>(this.url);
  }

  findImage(imageId: string): Observable<Base64UrlImage> {
    return this.httpClient.get<Base64UrlImage>(`${this.url}/${imageId}`);
  }

  createImage(image: File): Observable<Image> {
    const formData = new FormData();
    formData.set('file', image);
    return this.httpClient.post<Image>(`${this.url}`, formData);
  }

  deleteImage(imageId: string): Observable<Image> {
    return this.delete({ where: { id: imageId } });
  }
}

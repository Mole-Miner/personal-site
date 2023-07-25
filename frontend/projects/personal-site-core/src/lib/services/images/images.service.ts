import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { RestApiService } from "../rest-api.service";
import { Image, Base64UrlImage } from "../../types";

@Injectable()
export class ImagesService extends RestApiService<Image> {

  constructor() {
    super('images');
  }

  downloadImages(): Observable<Base64UrlImage[]> {
    return this.httpClient.get<Base64UrlImage[]>(this.url);
  }

  downloadImage(imageId: string): Observable<Base64UrlImage> {
    return this.httpClient.get<Base64UrlImage>(`${this.url}/${imageId}`);
  }

  uploadImage(file: File): Observable<Image> {
    const formData = new FormData();
    formData.set('file', file);
    return this.httpClient.post<Image>(`${this.url}`, formData);
  }

  deleteImage(imageId: string): Observable<Image> {
    return this.delete({ where: { id: imageId } });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CreateImageRequest, CreateImageResponse } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseUrl: string = environment.apiUrl;

  /**
   * Constructs the ProductService.
   * @param http The HttpClient instance for making HTTP requests.
   */
  constructor(protected http: HttpClient) {
    this.baseUrl += 'image/';
  }

  create(inputImage: any): Observable<CreateImageResponse> {
    return this.http.post<CreateImageResponse>(`${this.baseUrl}createImg`, inputImage);
  }

}
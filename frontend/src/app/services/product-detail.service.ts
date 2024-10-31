import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';
import { ProductDetailDTO, ProductDetailListResponse } from '../models/product-detail.models';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService extends AbstractService<ProductDetailDTO> {
  
  constructor(http: HttpClient) {
    super(http);
    this.type = 'productDetails/';
    this.baseUrl += this.type;
  }

  detailProduct(id: number): Observable<ProductDetailListResponse> {
    return this.http.get<ProductDetailListResponse>(`${this.baseUrl}details?id=` + id);
  }
}

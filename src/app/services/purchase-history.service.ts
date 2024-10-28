import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { PurchaseHistoryDTO } from '../models/purchase-history.model';
import { Observable } from 'rxjs';
import { GetAllProductsResponse, SearchRequest } from '../models/product.model';

/** Service for purchase history */
@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService extends AbstractService<PurchaseHistoryDTO> {
  
  /**
   * Constructs an instance of PurchaseHistoryService.
   * @param {HttpClient} http The Angular HttpClient for making HTTP requests.
   */
  constructor(http: HttpClient) {
    super(http);
    this.type = 'history/';
    this.baseUrl += this.type;
  }

  /**
   * Retrieves popular products.
   * @returns {Observable<GetAllProductsResponse>} An Observable emitting an array of ProductDTO representing popular products.
   */
  popularProducts(): Observable<GetAllProductsResponse> {
    return this.http.get<GetAllProductsResponse>(`${this.baseUrl}popularProducts`);
  }
}

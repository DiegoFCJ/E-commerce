import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetAllProductsResponse,
  ProductDTO,
  ProductResponse,
  SearchRequest,
} from '../models/product.model';
import { AbstractService } from './abstract.service';

/**
 * Service responsible for handling product-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService extends AbstractService<ProductDTO> {
  /**
   * Constructs the ProductService.
   * @param http The HttpClient instance for making HTTP requests.
   */
  constructor(http: HttpClient) {
    super(http);
    this.type = 'product/';
    this.baseUrl += this.type;
  }

  /**
   * Retrieves a list of new products from the server.
   * @returns An observable containing the list of new products.
   */
  newProducts(): Observable<GetAllProductsResponse> {
    return this.http.get<GetAllProductsResponse>(`${this.baseUrl}newProducts`);
  }

  search(req: SearchRequest): Observable<GetAllProductsResponse> {
    return this.http.post<GetAllProductsResponse>(`${this.baseUrl}search`, req);
  }

  readById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}read?id=` + id);
  }
}

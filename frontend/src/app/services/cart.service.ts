import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { CartDTO, CartResponse } from '../models/cart.model';
import { Observable } from 'rxjs';
import { AuthUtilsService } from './transfer-data/auth-utils.service';
import { UserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CartService extends AbstractService<CartDTO> {
  constructor(http: HttpClient, private authUtilsService: AuthUtilsService) {
    super(http);
    this.type = 'cart/';
    this.baseUrl += this.type;
  }

  readByUserId(id: number): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.baseUrl}readByUserId?id=` + id);
  }

 
}

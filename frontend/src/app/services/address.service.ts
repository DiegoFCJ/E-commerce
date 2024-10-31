import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressArrayResponse, AddressDTO, AddressResponse } from '../models/address.model';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddressService  extends AbstractService<AddressDTO>{
  
  constructor(http: HttpClient) {
    super(http);
    this.type = 'address/';
    this.baseUrl += this.type;
  }
  /**
   * Retrieves the 'Anagraphic' resource associated with the specified user ID.
   * @param {number} anagraphic_id The ID of the user whose 'Anagraphic' resource is to be retrieved.
   * @returns {Observable<AddressArrayResponse>} An Observable emitting the DTO representing the retrieved 'Anagraphic' resource.
   */
  getAllByAnagraphicId(anagraphic_id: number): Observable<AddressArrayResponse> {
    return this.http.get<AddressArrayResponse>(`${this.baseUrl}getAllByAnagraphicId?anagraphic_id=` + anagraphic_id);
  }
}

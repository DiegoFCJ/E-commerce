import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnagraphicDTO, AnagraphicResponse } from '../models/anagraphic.model';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Service for interacting with the 'Anagrafica' resource.
 */
@Injectable({
  providedIn: 'root'
})
export class AnagraphicService extends AbstractService<AnagraphicDTO> {
  
  /**
   * Constructs an instance of AnagraphicService.
   * @param {HttpClient} http The Angular HttpClient for making HTTP requests.
   */
  constructor(http: HttpClient) {
    super(http);
    this.type = 'anagraphic/';
    this.baseUrl += this.type;
  }

  /**
   * Retrieves the 'Anagraphic' resource associated with the specified user ID.
   * @param {number} user_id The ID of the user whose 'Anagraphic' resource is to be retrieved.
   * @returns {Observable<AnagraphicResponse>} An Observable emitting the DTO representing the retrieved 'Anagraphic' resource.
   */
  readByUserId(user_id: number): Observable<AnagraphicResponse> {
    return this.http.get<AnagraphicResponse>(`${this.baseUrl}readByUserId?user_id=` + user_id);
  }
}

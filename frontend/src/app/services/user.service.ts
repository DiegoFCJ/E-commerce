import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { FindByEoUResponse, UserDTO } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends AbstractService<UserDTO>{
  
  constructor(http: HttpClient) {
    super(http);
    this.type = 'user/';
    this.baseUrl += this.type;
  }

  getUserByEmailOrUsername(email: string): Observable<FindByEoUResponse> {
    return this.http.get<FindByEoUResponse>(`${this.baseUrl}getUserByEmailOrUsername?emailOrUsername=${email}`);
  }

  
}

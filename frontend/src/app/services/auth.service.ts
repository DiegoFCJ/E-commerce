import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/util-DTOs/JWT/auth.model';
//import { AuthUtilsService } from './transfer-data/auth-utils.service';
import { GenMsgResponse } from '../models/util-DTOs/generic.model';

/** Service for login and authentication */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiUrl + "auth/";

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Log in to the application
   *
   * @param {LoginRequest} payload Body sent in the request with email, password, and remember me
   * @returns {Observable<SignResponse>}
   */
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}authenticate`, payload);
  }

  register(payload: RegisterRequest): Observable<GenMsgResponse> {
    return this.http.post<GenMsgResponse>(`${this.baseUrl}register`, payload);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenMsgResponse } from '../models/util-DTOs/generic.model';
import { FindByEoURequest, FindByEoUResponse } from '../models/user.model';
import { PasswordRecoveryRequest } from '../models/verification-token.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  baseUrl: string = environment.apiUrl;

  /**
   * Constructs the EmailService.
   * @param http The HttpClient module for making HTTP requests.
   */
  constructor(protected http: HttpClient) {
    this.baseUrl += 'email/';
  }

  /**
   * Sends a request to activate a user account using the provided token.
   * @param token The activation token for the user account.
   * @returns An Observable of type GenMsgResponse containing the result of the activation request.
   */
  activation(token: string): Observable<GenMsgResponse> {
    return this.http.post<GenMsgResponse>(`${this.baseUrl}activation`, token);
  }

  /**
   * Sends a recovery email to the user with the provided details.
   * @param userForVToken The user details used to send the recovery email.
   * @returns An Observable of type GenMsgResponse containing the result of the recovery email request.
   */
  sendRecoveryMail(userForVToken: FindByEoURequest): Observable<FindByEoUResponse> {
    return this.http.post<FindByEoUResponse>(`${this.baseUrl}sendRecoveryMail`, userForVToken);
  }

  /**
   * Confirms the recovery of a password using the provided token and password details.
   * @param tokenPlusPassDTO The token and new password details for confirming the password recovery.
   * @returns An Observable of type GenMsgResponse containing the result of the password recovery confirmation.
   */
  confirmRecoverPassword(passwordRecovery: PasswordRecoveryRequest): Observable<GenMsgResponse> {
    return this.http.post<GenMsgResponse>(`${this.baseUrl}confirmRecoverPassword`, passwordRecovery);
  }

  /**
   * Deletes a token from the database using the provided token.
   * @param token The token to be deleted from the database.
   * @returns An Observable of type GenMsgResponse containing the result of the token deletion request.
   */
  deleteTokenByToken(token: string): Observable<GenMsgResponse> {
    return this.http.delete<GenMsgResponse>(`${this.baseUrl}deleteTokenByToken?token=${token}`);
  }

}
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserDTO } from 'src/app/models/user.model';
import { CartUtilsService } from './cart-utils.service';
import { NotificationService } from './notification.service';
import * as notifications from 'src/app/constants/sweat-alert.constant'
import { Roles } from 'src/app/models/util-DTOs/enumerations/roles.enum';
import { RouteChangeSubscriptionService } from './route-change-subscription.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUtilsService {
  /** Subject for updating the user name */
  updateUserName: Subject<UserDTO> = new Subject<UserDTO>();

  /**
   * Constructor of the service
   * @param cartUtilsService 
   */
  constructor(
    private cartUtilsService: CartUtilsService,
    private routeService: RouteChangeSubscriptionService

  ) { }

  /** Log out from the application */
  logout(): void {
      this.clearStorage();
      this.routeService.goToLogin();
      this.cartUtilsService.removeCartProductsNum();
      this.cartUtilsService.toggleBadgeVisibility();
  }

  /**
   * Save the logged-in user to localStorage or sessionStorage
   *
   * @param {string} name The name of the logged-in user to be saved in localStorage
   * @param {string} surname The surname of the logged-in user to be saved in localStorage
   * @param {string} role The type of the logged-in user to be saved in localStorage
   */
  setUserLocal(user: UserDTO): void {
    localStorage.setItem(
      'user',JSON.stringify(user)
    );
    this.updateUserName.next(user);
  }
  
  setUserSession(user: UserDTO): void {
    sessionStorage.setItem(
      'user',JSON.stringify(user)
    );
    this.updateUserName.next(user);
  }

  /** Get the logged-in user from localStorage or sessionStorage */
  getUser(): any {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage?.getItem('user') ?? '{}');
    } else if (localStorage.getItem('user')) {
      return JSON.parse(localStorage?.getItem('user') ?? '{}');
    } else {
      return "notLogged";
    }
  }

  /**
   * Return an observable for updating the user name
   *
   * @returns {Observable<UserDTO>}
   */
  updateUserNameListener(): Observable<UserDTO> {
    return this.updateUserName.pipe();
  }

  /** Clear localStorage and sessionStorage */
  clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  /**
   * Check if the connected user is ADMIN
   * @returns {boolean} If it is ADMIN
   */
  isAdmin(): boolean {
    if (localStorage.getItem('user')) {
      let userSession : UserDTO = this.getUser();
      return userSession.role === Roles.ADMIN;
    }
    return false;
  }
  
  /**
   * Check if the user is in localStorage, sessionStorage, or not logged in
   * @returns true if the user is logged in
   */
  isLoggedIn(): boolean {
    if (this.getUser() !== "notLogged") {
      return true;
    }
    return false;
  }

  /**
   * Handle the case where the user is not logged in
   * (show alert and redirect to login)
   */
  handleNotLoggedCase(){
    if(!this.isLoggedIn()){
      NotificationService.showDynamicResponseAlert(
        notifications.ICO_INFO,
        notifications.LOGIN.WARNING_NO_ACC,
        3000
      ).then(
        () => {
          this.cartUtilsService.removeCartProductsNum();
          this.routeService.goToLogin();
        }
      )
    }
  }

  /**
   * Handle the case where the user is logged in
   * (show alert and redirect to home)
   */
  handleLoggedCase(){
    if(this.isLoggedIn()){
      NotificationService.showDynamicResponseAlert(
        notifications.ICO_INFO,
        notifications.LOGIN.INFO,
        3000
      ).then(
        () => {
          this.routeService.goToHome();
        }
      )
    }
  }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PanelService } from './panel.service';

/**
 * Service to manage route change subscriptions and side navigation.
 */
@Injectable({
  providedIn: 'root'
})
export class RouteChangeSubscriptionService {

  private selectedMenuItemSubject: BehaviorSubject<string> = new BehaviorSubject<string>('chartSellings');
  public selectedMenuItem$: Observable<string> = this.selectedMenuItemSubject.asObservable();

  setSelectedMenuItem(selectedMenuItem: string): void {
    this.selectedMenuItemSubject.next(selectedMenuItem);
  }
    
  /** Subscription for route changes */
  private routeChangeSubscription!: Subscription;
  
  /** Flag to track the state of the side navigation */
  opened: boolean = false;

  /**
   * Constructs an instance of RouteChangeSubscriptionService.
   * @param router The Angular router for navigation.
   */
  constructor(
      private panelService: PanelService,
      private dialog: MatDialog,
      private router: Router) { }

  /** Retrieves the route change subscription */
  getRouteChangeSubscription(){
    return this.routeChangeSubscription;
  }

  /**
   * Sets the route change subscription to the provided value.
   * @param routeChangeSubscription The subscription for route changes.
   */
  setRouteChangeSubscription(routeChangeSubscription: any){
    this.routeChangeSubscription = routeChangeSubscription;
  }

  /** Unsubscribes from route change subscription */
  unsubscribeSub(){
    this.routeChangeSubscription.unsubscribe();
  }

  /** Toggles the state of the side navigation */
  toggleSideNav() {
    this.opened = !this.opened;
  }

  /**
   * Determines whether an element should be shown based on the route.
   * @param route The current route.
   * @returns {boolean} Whether the element should be shown.
   */
  shouldShowElement(route: string): boolean {
    // Hide the side navigation on certain routes
    if (
      route === '/OfficeOasis/auth/login' ||
      route === '/OfficeOasis/auth/register' ||
      route.includes('passwordRecovery')
    ) {
      this.opened = false;
    }
  
    // Conditions to show or hide the element
    return (
      route !== '/OfficeOasis/auth/login' &&
      route !== '/OfficeOasis/auth/register' &&
      route !== '/OfficeOasis/profile' &&
      !route.includes('passwordRecovery')
    );
  }

  dontShowNavSearch(route: string): boolean{
  
    // Get the last part of the URL
    const parts = route.split('/');
    const lastPart = parts.pop();

    return (
      route !== '/OfficeOasis/products' &&
      route !== '/OfficeOasis/products/' + lastPart
    );
  }
  
  

  /** Checks if the current route is in the profile section */
  isInProfile(){
    return this.router.url === "/OfficeOasis/profile";
  }

  /** Checks if the current route is in the home section */
  isInHome(){
    return this.router.url === "/OfficeOasis/home";
  }

  /** Checks if the current route is in the all products section */
  isInAllProducts(){
    return this.router.url === "/OfficeOasis/products";
  }

  /** Checks if the current route is in the login auth section */
  isInLogin(){
    return this.router.url === "/OfficeOasis/auth/login";
  }

  /** Keeps the side navigation opened */
  keepItOpened(){
    this.opened = true;
  }

  /** Closes the side navigation */
  closeIt(){
    this.opened = false;
    this.unsubscribeSub();
  }

  /** Handles route changes */
  handleRouteChange() {
    // Execute code when the route changes
    this.routeChangeSubscription.unsubscribe();
    console.log('opened', this.opened)
    if(this.opened){
      this.toggleSideNav();
    }
  }

  /** Navigate to the login URL */
  goToLogin(): void {
    this.dialog.closeAll();
    if (this.panelService.componentRef) {
      this.panelService.close();
    }
    if (this.panelService.parentComponentRef) {
      this.panelService.parentComponentRef.instance.closeDialog();
    }
    this.router.navigate(['OfficeOasis/auth/login']);
  }

  /** Navigate to the home URL */
  goToHome(): void {
    this.dialog.closeAll();
    if (this.panelService.componentRef) {
      this.panelService.close();
    }
    if (this.panelService.parentComponentRef) {
      this.panelService.parentComponentRef.instance.closeDialog();
    }
    this.router.navigate(['OfficeOasis/home']);
  }

  /** Navigate to the all products URL */
  goToAllProducts(): void {
    this.dialog.closeAll();
    if (this.panelService.componentRef) {
      this.panelService.close();
    }
    if (this.panelService.parentComponentRef) {
      this.panelService.parentComponentRef.instance.closeDialog();
    }
    this.router.navigate(['OfficeOasis/products']);
  }


  goToAllProductsSearch(search:any): void {
    this.dialog.closeAll();
    if (this.panelService.componentRef) {
      this.panelService.close();
    }
    if (this.panelService.parentComponentRef) {
      this.panelService.parentComponentRef.instance.closeDialog();
    }
    this.router.navigate(['OfficeOasis/products', search]);
  }

  /**
   * Change the end part of the route where you want to go to reduce code in the profile
   * @param endRoute End route part
   */
  goToProfileChild(endRoute: string): void{
    this.router.navigate(['OfficeOasis/profile/' + endRoute]);
  }
}
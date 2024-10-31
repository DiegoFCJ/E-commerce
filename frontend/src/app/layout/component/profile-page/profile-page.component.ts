import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';
import { UserDTO } from 'src/app/models/user.model';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import { AnagraphicService } from 'src/app/services/anagraphic.service';
import { AnagraphicDTO } from 'src/app/models/anagraphic.model';
import { Observable, switchMap, of, catchError } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { AddressDTO } from 'src/app/models/address.model';

/**
 * Component responsible for displaying user profile page.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy{
  /** The authenticated user's information. */
  user!: UserDTO;
  menuItem!: string;
  isAnagInDB: boolean = false;
  isOneAddressInDB: boolean = false;
  foundAnagraphic!: AnagraphicDTO;
  foundAddresses: AddressDTO[] = [];

  /**
   * Constructs the ProfilePageComponent.
   * @param authUtilsService The service for authentication-related operations.
   * @param routeService The service for handling route changes.
   */
  constructor(
    protected authUtilsService: AuthUtilsService,
    private routeService: RouteChangeSubscriptionService,
    private anagServ: AnagraphicService,
    private addressServ: AddressService
  ) {}

  /**
   * Lifecycle hook called after the component is initialized.
   * Handles initialization tasks such as checking user authentication status,
   * retrieving user information, and subscribing to route changes.
   */
  ngOnInit(): void {
    this.routeService.selectedMenuItem$.subscribe((menuItem: string) => {
      this.menuItem = menuItem;
    });
    console.log(this.menuItem)
    // Ensure the user is logged in
    this.authUtilsService.handleNotLoggedCase();
    // Retrieve user information
    this.user = this.authUtilsService.getUser();
    // Subscribe to route changes to keep the modal open
    this.routeService.keepItOpened();
    this.asideWidthSetter();
    this.isAnagraphicInDB().subscribe((result) => {
      this.isAnagInDB = result; // Assegna il valore booleano restituito dalla sottoscrizione all'Observable
      this.isAddressInDB().subscribe((result) => {
        this.isOneAddressInDB = result; // Assegna il valore booleano restituito dalla sottoscrizione all'Observable
      });
    });
    
  }

  /**
   * Sets the width of the aside panel dynamically based on its content.
   */
  asideWidthSetter() {
    const component = document.getElementById("aside-w");
    const asideWidthTaker = component ? component.offsetWidth : null;
    document.documentElement.style.setProperty('--aside-width-from-drawer', asideWidthTaker + "px");
  }

  /**
   * Lifecycle hook called before the component is destroyed.
   * Handles cleanup tasks such as unsubscribing from route changes.
   */
  ngOnDestroy(): void {
    this.routeService.closeIt();
    
  }

  isAnagraphicInDB(): Observable<boolean> {
    return this.anagServ.readByUserId(this.user.id).pipe(
      switchMap((res) => {
        if (res.message === "Non trovato!") {
          return of(false);
        } else {
          this.foundAnagraphic = res.data;
          return of(true);
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  isAddressInDB(): Observable<boolean> {
    return this.addressServ.getAllByAnagraphicId(this.foundAnagraphic.id).pipe(
      switchMap((res) => {
        console.log(res)
        if (res.message !== "Trovati!") {
          return of(false);
        } else {
          this.foundAddresses = res.data;
          return of(true);
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}

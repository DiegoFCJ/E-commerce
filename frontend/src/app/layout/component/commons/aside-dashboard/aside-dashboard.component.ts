import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fadeInOutAnimation } from 'src/app/animations/on-page-change.animations';
import { AnagraphicDTO } from 'src/app/models/anagraphic.model';
import { CreateProfileImageRequest } from 'src/app/models/image.model';
import { UserDTO } from 'src/app/models/user.model';
import { AnagraphicService } from 'src/app/services/anagraphic.service';
import { ImageService } from 'src/app/services/image.service';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';
import { UserService } from 'src/app/services/user.service';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import Swal from 'sweetalert2';

/**
 * Component responsible for managing the dashboard aside panel.
 */
@Component({
  selector: 'app-aside-dashboard',
  templateUrl: './aside-dashboard.component.html',
  styleUrls: ['./aside-dashboard.component.scss'],
  animations: [
    fadeInOutAnimation, 
  ] 
})
export class AsideDashboardComponent implements OnInit, OnDestroy {

  /** The current authenticated user. */
  user!: UserDTO;
  
  /** All user data retrieved from the backend. */
  allUserData!: AnagraphicDTO;
  
  /** Flag indicating whether the aside panel is open. */
  panelOpenState: boolean = false;
  
  /** Flag indicating whether the aside panel is opened. */
  isOpenedCheck: boolean = false;

  /**
   * Constructs the AsideDashboardComponent.
   * @param authUtilsService The service for authentication-related operations.
   * @param router The Router instance for navigation.
   * @param routeChange The service for handling route changes.
   * @param notify The service for displaying notifications.
   * @param anagraphicService The service for fetching user data.
   */
  constructor(
    protected authUtilsService: AuthUtilsService,
    protected routeChange: RouteChangeSubscriptionService,
    protected notify: NotificationService,
    protected router: Router,
    private anagraphicService: AnagraphicService,
    private imageService: ImageService,
    private userServ: UserService
  ) {
    // Subscribe to router events to handle route changes
    this.routeChange.setRouteChangeSubscription(
      this.router.events.subscribe(
        (event) => {
        if (event instanceof NavigationEnd) {
          // Call the method when the route changes
          this.routeChange.handleRouteChange();
        }
      })
    )
  }

  /**
   * Lifecycle hook called after Angular has fully initialized a component's view.
   */
  ngOnInit(): void {
    this.user = this.authUtilsService.getUser();
    this.setCloseLastDr();
  }
  
  /**
   * Lifecycle hook called before the component is destroyed.
   */
  ngOnDestroy() {
    this.routeChange.unsubscribeSub();
    this.setCloseLastDr();
  }

  /**
   * Handles route change events.
   * Unsubscribes from route changes and toggles the aside panel if it's open.
   */
  private handleRouteChange() {
    this.routeChange.unsubscribeSub();
    if (this.routeChange.opened) {
      this.routeChange.toggleSideNav();
    }
  }

  /**
   * Opens the last drawer on the aside panel.
   */
  setOpenLastDr() {
    this.panelOpenState = true;
    this.isOpenedCheck = true;
  }

  /**
   * Closes the last drawer on the aside panel.
   */
  setCloseLastDr() {
    this.panelOpenState = false;
    this.isOpenedCheck = false;
  }

  /**
   * Retrieves user data from the backend.
   */
  retrieveAnagraphicData() {
    this.anagraphicService.readByUserId(this.user.id).subscribe({
      next: (res) => {
        this.allUserData = res.data;
      },
      error: (error) => {
        console.log('error', error)
      },
    })
  }

  imageInput: CreateProfileImageRequest = {
    file: new Map<string, object>(),
    anagraphicDTO: {id: 1},
  };
  


  handleImage(){
    this.notify.profileImgChange()
      .then((result) => {
        if (result) {
          console.log('result', result);
          this.imageInput.file = result;
          console.log('imageInput', this.imageInput);
  
          this.imageService.create(this.imageInput).subscribe((res) => console.log('res', res));
        }
      });
  }
  
  changeContent(content: string){
    this.routeChange.setSelectedMenuItem(content);
    console.log(content)
  }

  deleteAccount(){
    this.notify.areYouSureToDelete().then((boolean) => {
      if(boolean === true){
        this.userServ.delete(this.user.id).subscribe({
          next: (res) => {
              console.log('res', res);
              NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, res.message, 4000);
          },
          error: (err) => {
              console.log('err', err);
              NotificationService.showDynamicResponseAlert(notifications.ICO_ERROR, err.error.message, 4000);
          },
        })
      }else{
        NotificationService.showDynamicResponseAlert(notifications.ICO_ERROR, "Il tuo account e' salvo... per ora...", 4000);
      }
    })
  }

}
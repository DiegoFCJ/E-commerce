import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CartDTO } from 'src/app/models/cart.model';
import { UserDTO } from 'src/app/models/user.model';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';
import { FormBuilder} from '@angular/forms';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import { CartUtilsService } from 'src/app/services/transfer-data/cart-utils.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

/**
 * Component representing the layout of the application.
 * Manages user session, cart visibility, and route changes.
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html', 
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit {
  /** User session information */
  user!: UserDTO;

  cart!: CartDTO;

  /**
   * Constructs an instance of LayoutComponent.
   * @param authUtilsService The authentication service.
   * @param router The Angular router for navigation.
   * @param routeService The service for managing route changes.
   * @param cartUtilsService The service for managing the shopping cart.
   */
  constructor(
    protected authUtilsService: AuthUtilsService,
    protected router: Router,
    protected routeService: RouteChangeSubscriptionService,
    protected cartUtilsService: CartUtilsService,
    protected cartService: CartService
  ) {
  }

  /** Initializes the component */
  ngOnInit(): void {
    this.searchbbarWidthSetter();

    if(this.authUtilsService.isLoggedIn()){
      this.user=this.authUtilsService.getUser()
      //this.readCartByUserId(this.user.id);
    }
  }

  /** Reads the user's cart by user ID. */
  // readCartByUserId(userId:number){
  //   this.cartService.readByUserId(userId).subscribe({
      
  //     next: (res) => {
  //       console.log('res :>> ', res);
  //       if(res && res.data){
  //         this.cartUtilsService.setCart(res.data);
  //       }else{
  //         const emptyCart:CartDTO={
  //           id:0,
  //           userDTO:this.authUtilsService.getUser(),
  //           productDetailsDTOList:[]
  //         }
  //         this.cartUtilsService.setCart(emptyCart);
  //         this.routeService.goToHome();
  //       }
  //     },
  //     // error: (error) => {
  //     //   console.log('error', error.error.message)
  //     // }
  //   })
  // }

  giveLength(){
    if(this.authUtilsService.isLoggedIn()){
      if(this.cart){
        return this.cart.productDetailDTOList.length;
      }
    }
    this.cartUtilsService.hidden=true;
    return 0;
  }

  searchbbarWidthSetter(){
    const component = document.getElementById("nomeAzienda");
    const companyNameWidth = component ? component.offsetWidth : null;
    document.documentElement.style.setProperty('--company-name-width', companyNameWidth + "px");
  }

  /** Cleans up subscriptions when the component is destroyed */
  ngOnDestroy() {
    this.routeService.closeIt();
  }
}
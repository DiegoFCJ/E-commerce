import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartDTO } from 'src/app/models/cart.model';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import { CartUtilsService } from 'src/app/services/transfer-data/cart-utils.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import { Colors } from 'src/app/models/util-DTOs/enumerations/colors.enum';
import { Categories } from 'src/app/models/util-DTOs/enumerations/categories.enum';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';
import { ProductDetailDTO } from 'src/app/models/product-detail.models';
import { CartService } from 'src/app/services/cart.service';
/**
 * Component for displaying and managing the user's shopping cart.
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  /** The user's shopping cart. */
  cart!: CartDTO;
  DTOList!: ProductDetailDTO[];

  shipping: number = 5;
  subtotal: number = 0;
  total:number= 0

  /** User logged */

  /**
   * Constructs the CartComponent.
   * @param authUtilsService The authentication service.
   * @param cartUtilsService The cart service.
   */
  constructor(
    protected authUtilsService: AuthUtilsService,
    private cartUtilsService: CartUtilsService,
    private routeService: RouteChangeSubscriptionService,
    private cartService: CartService
  ) {}

  /** Method called on component initialization. */
  ngOnInit(): void {
    this.authUtilsService.handleNotLoggedCase();
    if (this.cartUtilsService.getCart() !== 'Empty Cart') {
      this.cart = this.cartUtilsService.getCart();
      this.DTOList = this.cart.productDetailDTOList;
      this.productsSum()
      console.log('CARRELLO', this.cart);
    } else {
      NotificationService.showDynamicResponseAlert(
        notifications.ICO_ERROR,
        'Non ci sono prodotti nel tuo carrello vai subito a comprare veloce',
        4000
      ).then(() => this.routeService.goToAllProducts());
    }
  }

  /** Cleans up subscriptions when the component is destroyed */
  ngOnDestroy() {
    this.routeService.closeIt();
  }

  removeFromCart(id: number) {
    //Prodotto da eliminare dal carrello
    const productToRemove = this.DTOList.find((x) => x.productDTO.id === id);
    console.log('remove :>> ', productToRemove);

    //nuovo array per update carrello
    let newArray: ProductDetailDTO[] = this.DTOList.filter(
      (item) => item != productToRemove
    );
    console.log(newArray);

    //INIT CARRELLO
    let cartToUpdate: CartDTO = this.cartUtilsService.getCart();
    cartToUpdate.productDetailDTOList = newArray || [];

    console.log('CTU', cartToUpdate);
    this.cartUtilsService.setCart(cartToUpdate);
    this.cartService.update(cartToUpdate).subscribe((res) => {
      this.cart = this.cartUtilsService.getCart();
      this.DTOList = this.cart.productDetailDTOList;
      this.productsSum()

      console.log('res :>> ', res);
    });
  }


  productsSum(){
    let sum:number=0
    this.DTOList.forEach(element => {
      sum+=element.productDTO.price-(element.productDTO.price*element.productDTO.discount/100)
      
    });
    this.subtotal= sum
    this.total=this.subtotal+this.shipping
  }
}

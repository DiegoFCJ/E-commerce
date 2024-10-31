import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CartDTO } from 'src/app/models/cart.model';
import { CartService } from '../cart.service';
import { UserDTO } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CartUtilsService {
  updatedProductsOnSession: Subject<CartDTO> = new Subject<CartDTO>();

  
  /** Flag to control the visibility of the cart badge */
  hidden = false;
  

  constructor() { }

  /**
   * Saves the cart on localstorage 
   */
  setCart(cart: CartDTO): void {
    localStorage.setItem('cart',JSON.stringify(cart));
    this.updatedProductsOnSession.next(cart);
    this.updateProductsOnSessionListener();
  }

  /** 
   * Retrives the cart from localstorage  
  */
  getCart(): any {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage?.getItem('cart') ?? '{}');
    } else {
      return "Empty Cart";
    }
  }

  /**
   * @returns the updated number of prudcts on localstorage
   */
  updateProductsOnSessionListener(): Observable<CartDTO> {
    return this.updatedProductsOnSession.pipe();
  }

  /** 
   * Removes the cart from localstorage  
  */
  removeCartProductsNum(): any {
    if (localStorage.getItem('cart')) {
      localStorage.removeItem('cart');
    }
  }

  /** Toggles the visibility of the cart badge */
  toggleBadgeVisibility() {
    if(this.getCart() === "Empty Cart"){
      this.hidden = true;
    }else{
      this.hidden = false;
    }
  }



  
  
}

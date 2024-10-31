import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartDTO } from 'src/app/models/cart.model';
import { ProductDetailDTO } from 'src/app/models/product-detail.models';
import { ProductDTO, SearchRequest } from 'src/app/models/product.model';
import { PurchaseHistoryDTO } from 'src/app/models/purchase-history.model';
import { Colors } from 'src/app/models/util-DTOs/enumerations/colors.enum';
import { OrderBy } from 'src/app/models/util-DTOs/enumerations/order-by.enum';
import { CartService } from 'src/app/services/cart.service';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ProductService } from 'src/app/services/product.service';
import { PurchaseHistoryService } from 'src/app/services/purchase-history.service';
import { CartUtilsService } from 'src/app/services/transfer-data/cart-utils.service';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';

/**
 * Component responsible for displaying product details.
 */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  /** The ID of the product to display details for. */
  productId!: number;

  /** The product object containing details. */
  products!: ProductDetailDTO[];
  product!: ProductDTO;
  productToBuy!: ProductDetailDTO;

  suggestedProd: ProductDTO[] = [];
  visibleProducts: ProductDTO[] = [];

  variant: Colors[] = [];
  color!: Colors;
  quantity: number = 1;
  maxQuantity: number = 1;
  salePrice!: number;
  hasColors: boolean = true;

  /**
   * Constructs the ProductDetailComponent.
   * @param route The ActivatedRoute instance for accessing route parameters.
   * @param productService The service for fetching product details.
   */
  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService,
    private routeService: RouteChangeSubscriptionService,
    private cartUtilsService: CartUtilsService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  /**
   * Lifecycle hook called after Angular has initialized all data-bound properties
   * of a directive. Define an ngOnInit() method to handle any additional initialization tasks.
   */
  ngOnInit(): void {
    // Get the product ID from route parameters
    this.productId = this.route.snapshot.params['n'];

    // Fetch product details using the product ID
    this.read(this.productId);
  }

  /**
   * Fetches product details using the provided product ID.
   * @param prodId The ID of the product to fetch details for.
   */
  read(prodId: number): void {
    this.productDetailService.detailProduct(prodId).subscribe({
      next: (res) => {
        this.products = res.data;
        console.log('products :>> ', this.products);
        this.products.forEach((element) => {
          if (element.colors != 'OTHER') {
            this.variant.push(element.colors);
          } else {
            this.hasColors = false;
          }
        });
        this.product = res.data[0].productDTO;
        this.salePrice =
          this.product.price -
          (this.product.price * this.product.discount) / 100;
        this.color = res.data[0].colors;
        this.maxQuantity = res.data[0].quantity;

        //search request
        const popProdReq: SearchRequest = {
          name: '',
          category: this.product.category,
          orderBy: OrderBy.NULL,
        };
        this.productService.search(popProdReq).subscribe({
          next: (res) => {
            //fetch suggested product using product category

            console.log('suggestedProduct>>', res.data);
          },
          error: (error) => {
            console.error('Dettaglio Prodotto', error.error.message);
          },
        });
      },
      error(error) {
        console.error('Dettaglio Prodotto', error.error.message);
      },
    });
  }

  onSelectedVariant(variant: Colors) {
    //CAMBIO PRODOTTO
    const foundProduct = this.products.find(
      (x) => x.colors.toString() === variant
    );

    if (foundProduct) {
      this.color = foundProduct.colors;
      this.maxQuantity = foundProduct.quantity;
      this.onSelectQuantity('');
    } else {
      this.color = Colors.OTHER;
      this.maxQuantity = 0;
      this.onSelectQuantity('reset');
    }
  }

  onSelectQuantity(choice: string) {
    if (choice === 'add') {
      this.quantity = Math.min(this.quantity + 1, this.maxQuantity);
    } else if (choice === 'remove') {
      this.quantity = Math.max(this.quantity - 1, 1);
    } else if (choice === 'reset') {
      this.quantity = 0;
    } else {
      this.quantity = 1;
    }
  }

  addToCart(color: Colors) {
    const findProduct = this.products.find(
      (x) => x.colors.toString() === color
    );
    if (findProduct) {
      this.productToBuy = findProduct;
    } else {
      console.error(
        'Nessun prodotto trovato con il colore specificato:',
        color
      );
    }
    //INIT CARRELLO
    let cartToUpdate: CartDTO = this.cartUtilsService.getCart();

    cartToUpdate.productDetailDTOList = cartToUpdate.productDetailDTOList || [];
    for (let i = 0; i < this.quantity; i++) {
      cartToUpdate.productDetailDTOList.push(this.productToBuy);
    }

    console.log('CTU', cartToUpdate);
    this.cartUtilsService.setCart(cartToUpdate);
    this.cartService.update(cartToUpdate).subscribe((res) => {
      console.log('res :>> ', res);
    });
  }

  /**
   * Lifecycle hook called before the component is destroyed.
   * Handles cleanup tasks such as unsubscribing from route changes.
   */


  //TODO Diego aiutami pls U_U
  updatedProducts(newList: ProductDTO[]) {
    this.visibleProducts = [];
    this.visibleProducts = newList;
  }

  ngOnDestroy(): void {
    this.routeService.closeIt();
  }
}

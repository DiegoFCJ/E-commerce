import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Categories } from 'src/app/models/util-DTOs/enumerations/categories.enum';
import { OrderBy } from 'src/app/models/util-DTOs/enumerations/order-by.enum';
import { ProductDTO, SearchRequest } from 'src/app/models/product.model';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';
import { filter } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import * as notifications from 'src/app/constants/sweat-alert.constant'


/**
 * Component responsible for displaying a list of products.
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  /** Array of products to display. */
  products: ProductDTO[] = [
    {
      id: 0,
      name: "",
      price: 0,
      description: "",
      category: Categories.OTHER,
      discount: 0,
      averageRating: 0,
    }
  ];

  visibleProducts: ProductDTO[] = [];
  
  /** Flag to control the display of products. */
  display: boolean = false;

  searchRequest: SearchRequest = {
    name: "",
    category: Categories.OTHER,
    orderBy: OrderBy.NULL
  }
  
  /** Paginator variables */
  pageTotalSize: number = 5;
  location: any;

  /**
   * Constructs the ProductsComponent.
   * @param productService The service for fetching product data.
   */
  constructor(
    private productService: ProductService,
    protected routeService: RouteChangeSubscriptionService,
    private route: ActivatedRoute,
    private router: Router) 
    {/*
      this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(
        (event: any) => {
          // Esegui le azioni desiderate quando l'URL cambia
          const url = event.url;
          if (url === '/OfficeOasis/products') {
            this.loadOrUpdateSearchedProducts();
          } else if (url === '/OfficeOasis/products/') {
            this.loadOrUpdateSearchedProducts();
          } else if (url.startsWith('/OfficeOasis/products/')) {

            this.searchRequest.name = url.slice('/OfficeOasis/products/'.length);
            this.loadOrUpdateSearchedProducts();
          } else {
            this.getAll();
          }
        }
      );*/
  } 

  /**
   * Lifecycle hook called after the component is initialized.
   * Fetches all products from the service.
   */
  ngOnInit(): void {
    this.getSearchParams();
  }

  // retrieves query "search" param from the URL
  getSearchParams(){
    this.route.params.subscribe(params => {
      if(params['search']){
        this.searchRequest.name = params['search'];
      } else if(params['search'] && params['category']){
        if(params['search'] !== 'null'){
          this.searchRequest.name = params['search'];
        }
        this.searchRequest.name = params['category'];
      } else if(params['search'] && params['category'] && params['orderBy']){
        if(params['search'] !== 'null'){
          this.searchRequest.name = params['search'];
        }
        this.searchRequest.name = params['category'];
        this.searchRequest.name = params['orderBy'];
      } else {
        this.getAll();
      }
      console.log('res', this.searchRequest);
      this.loadOrUpdateSearchedProducts();
    });
  }

  loadOrUpdateSearchedProducts() : ProductDTO[] {
    this.products = [];
    this.productService.search(this.searchRequest).subscribe({
      next: (res) => {
        if(res){
          if(res.data){
            this.products = [];
            this.products = res.data;

            this.visibleProducts = [];
            for (let i = 0; i < this.pageTotalSize; i++) {
              this.visibleProducts.push(res.data[i]);
            }
          }
        }
        return res.data;
      },
      error: (error) => {
        this.getAll();
        NotificationService.showDynamicResponseAlert(notifications.ICO_INFO, error.error.message, 2000);
      }
    });
    return this.products;
  }

  /** Cleans up subscriptions when the component is destroyed */
  ngOnDestroy() {
    this.routeService.closeIt();
  }

  updatedProducts(newList: ProductDTO[]) {
    this.visibleProducts = [];
    this.visibleProducts = newList;
  }

  updatedSearchedProducts(newList: ProductDTO[]) {
    this.visibleProducts = [];
    if(newList){
      for (let i = 0; i < this.pageTotalSize; i++) {
        this.visibleProducts.push(newList[i]);
      }
    }
  }
  // TODO  
  updateSearchRequest(val: any) {
    if(val){
      this.searchRequest = val;
      this.updatedSearchedProducts(this.loadOrUpdateSearchedProducts());
    }else{
      this.getAll();
    }
  }

  getAll(){
    this.searchRequest.name = '';
    this.searchRequest.category = Categories.OTHER;
    this.searchRequest.orderBy = OrderBy.NULL;
    this.loadOrUpdateSearchedProducts();
  }
}
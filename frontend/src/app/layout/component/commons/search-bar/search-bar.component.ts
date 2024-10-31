import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ProductDTO, SearchRequest } from 'src/app/models/product.model';
import { Categories } from 'src/app/models/util-DTOs/enumerations/categories.enum';
import { OrderBy } from 'src/app/models/util-DTOs/enumerations/order-by.enum';
import { ProductService } from 'src/app/services/product.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';

export interface FilterType{
  category: Categories;
  isChoosen: boolean;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{
  searchValue: any = null;
  searchForm = this.fb.nonNullable.group({searchValue:''});

  @Input() customWidth: string = '30vw';
  @Input() customHeight: string = '3vh';
  @Input() pageTotalSize!: number;
  @Input() visibleProducts: ProductDTO[] = [];
  @Input() products: ProductDTO[] = [];  
  @Output() loadOrUpdateSearchedProducts: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSearchRequest: EventEmitter<any> = new EventEmitter<any>();
  @Input() searchRequest: SearchRequest = {
    name: "",
    category: Categories.OTHER,
    orderBy: OrderBy.NULL
  }


  filters: FilterType[] = [
    {
      category: Categories.DRUM,
      isChoosen: false
    },
    {
      category: Categories.SERBATOI,
      isChoosen: false
    },
    {
      category: Categories.TESTINE,
      isChoosen: false
    },
    {
      category: Categories.TONER,
      isChoosen: false
    }
  ];

  /**
   * Constructs an instance of LayoutComponent.
   * @param authUtilsService The authentication service.
   * @param router The Angular router for navigation.
   * @param routeService The service for managing route changes.
   * @param cartUtilsService The service for managing the shopping cart.
   */
  constructor(
    protected router: Router,
    protected routeService: RouteChangeSubscriptionService,
    private fb:FormBuilder,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        const url = event.url;
        if (url === '/OfficeOasis/products' || url === '/OfficeOasis/products/') {
          this.searchRequest.name = '';
          this.updateListChild();
        } else if (url.startsWith('/OfficeOasis/products/')) {
          const parts = url.split('/');
          const lastPart = parts[parts.length - 1]; // Ottenere l'ultimo pezzo dell'URL
          if (lastPart) {
            this.searchRequest.name = lastPart;
            this.updateListChild();
          } else {
            // Se l'ultimo pezzo dell'URL non è presente, controlla i parametri dell'URL
            this.route.params.subscribe(params => {
              if (params['search']) {
                this.searchRequest.name = params['search'];
                this.updateListChild();
              }
            });
          }
        }
      });
  }

  searchProducts(){
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.routeService.goToAllProductsSearch(this.searchValue);
  }

  isSelected(): boolean{
    let selecxtedFlag = false;
    this.filters.forEach(element => {
      if(element.isChoosen){
        selecxtedFlag = true;
      }
    });

    return selecxtedFlag;
  }

  selector(s: string){
    switch(s){
      case Categories.DRUM:
        this.filters[0].isChoosen = true;
        this.filters[1].isChoosen = false;
        this.filters[2].isChoosen = false;
        this.filters[3].isChoosen = false;
        this.searchRequest.category = Categories.DRUM;
        this.updateSearchRequestChild();
        break;
      case Categories.SERBATOI:
        this.filters[0].isChoosen = false;
        this.filters[1].isChoosen = true;
        this.filters[2].isChoosen = false;
        this.filters[3].isChoosen = false;
        this.searchRequest.category = Categories.SERBATOI;
        this.updateSearchRequestChild();
        break;
      case Categories.TESTINE:
        this.filters[0].isChoosen = false;
        this.filters[1].isChoosen = false;
        this.filters[2].isChoosen = true;
        this.filters[3].isChoosen = false;
        this.searchRequest.category = Categories.TESTINE;
        this.updateSearchRequestChild();
        break;
      case Categories.TONER:
        this.filters[0].isChoosen = false;
        this.filters[1].isChoosen = false;
        this.filters[2].isChoosen = false;
        this.filters[3].isChoosen = true;
        this.searchRequest.category = Categories.TONER;
        this.updateSearchRequestChild();
        break;
      default:
        this.filters[0].isChoosen = false;
        this.filters[1].isChoosen = false;
        this.filters[2].isChoosen = false;
        this.filters[3].isChoosen = false;
        this.searchRequest.category = Categories.OTHER;
        this.updateSearchRequestChild();
        break;
    }
  }

  giveUpOnFilters(){
    this.selector('');
  }

  updateListChild() {
    this.loadOrUpdateSearchedProducts.emit();
  }

  updateSearchRequestChild() {
    this.updateSearchRequest.emit(this.searchRequest);
    this.updateListChild();
  }
}
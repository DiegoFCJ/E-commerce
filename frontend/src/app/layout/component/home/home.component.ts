import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { fadeInOutAnimation, resizeAnimation } from 'src/app/animations/on-page-change.animations';
import { ProductDTO } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';
import { PurchaseHistoryService } from 'src/app/services/purchase-history.service';

/**
 * Component responsible for displaying the home page.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeInOutAnimation,
    resizeAnimation
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public imageUrl: string = '../../../../assets/home/top-hero-home-2.jpg';
  private numberSequence: number[] = [2, 3, 4, 5, 6];
  public currentNumber: number = 0;
  currentIndex: number = -1;
  
  /** Flag to control the display of new-products === nP. */
  nPdisplay: boolean = false;
  
  /** Flag to control the display of popular-products === pP. */
  pPdisplay: boolean = false;

  /** List of new products to display on the home page. */
  newProducts: ProductDTO[] = [];
  
  /** List of popular products to display on the home page. */
  popularProducts: ProductDTO[] = [];
  
  /** Paginator variables */
  currentPage: number = 1;
  currentPageNew: number = 1;
  pageSize: number = 5;

  /**
   * Constructs the HomeComponent.
   * @param productService The product service.
   * @param purchaseHistoryService The purchase history service.
   */
  constructor(
    private productService: ProductService,
    protected authUtilsService: AuthUtilsService,
    protected routeService: RouteChangeSubscriptionService,
    private purchaseHistoryService: PurchaseHistoryService
  ) {}

  /** Initializes the component. */
  ngOnInit(): void {

    // Load new products
    this.loadNewProducts();

    // Load popular products
    this.loadPopularProducts();

    // Change background image every 5 seconds
    setInterval(() => this.changeBackground(), 5000);

    // Call the function to handle window resize
    this.handleWindowResize(); 
    this.asideWidthSetter();
  }

  /**
   * Sets the width of the aside panel dynamically based on its content.
   */
  asideWidthSetter() {
    const component2 = document.getElementById("aside-w-home");
    const asideWidthTaker2 = component2 ? component2.offsetWidth : null;
    document.documentElement.style.setProperty('--aside-width-home-from-drawer', asideWidthTaker2 + "px");
  }

  /** Loads the list of new products. */
  loadNewProducts(): void {
    this.productService.newProducts().subscribe({
      next: (res) => {
        this.newProducts = res.data;
        // Set display flag to true once products are fetched
        this.nPdisplay = true;
      },
      error(error) {
      },
    });
  }

  /** Loads the list of popular products. */
  loadPopularProducts() {
    this.purchaseHistoryService.popularProducts().subscribe({
      next: (res) => {
        if(res.data){
          this.popularProducts = res.data;
          // Set display flag to true once products are fetched
          this.pPdisplay = true;
        }
      },
      error: (error) => {
      }
    });
  }

  /** Changes the background image. */
  private changeBackground(): void {
    this.currentIndex = (this.currentIndex + 1) % this.numberSequence.length;
    this.currentNumber = this.numberSequence[this.currentIndex];
    this.imageUrl = `../../../../assets/home/top-hero-home-${this.currentNumber}.jpg`;
  }

  /** Returns the visible products for the current page. */
  get visibleProducts(): ProductDTO[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.popularProducts.length);
    return this.popularProducts.slice(startIndex, endIndex);
  }

  /** Handles navigation to the previous page. */
  navigateBefore(pageSize: number, currentPage: number): void {
    if (currentPage > 1) {
      if(pageSize > this.pageSize){
      this.currentPageNew--;
      }
      this.currentPage--;
    }
  }
  
  /** Handles navigation to the next page. */
  navigateNext(pageSize: number, currentPage: number): void {
    const maxPage = Math.ceil(this.popularProducts.length / pageSize);
    if (currentPage < maxPage) {
      if(pageSize > this.pageSize){
      this.currentPageNew++;
      }
      this.currentPage++;
    }
  }

  /** calculates the total pages */
  pagesTotal(pageSize: number){
    return Math.round(this.popularProducts.length / pageSize) +1;
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize(event?: any) {
    const asideTab = document.querySelector('.aside-tab');
    const rightSideCards = document.querySelector('.cards-first');
    if (window.innerWidth <= 1530) {
      //change css on width change
      rightSideCards?.classList.add('right-side-cards');
      // Hide the div when width is 1539 or less
      asideTab?.classList.add('hidden');
    } else {
      // Show the div when width is more than 1539
      asideTab?.classList.remove('hidden');
      rightSideCards?.classList.remove('right-side-cards');
    }
  }

  /** Cleans up subscriptions when the component is destroyed */
  ngOnDestroy() {
    this.routeService.closeIt();
  }
}
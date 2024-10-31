import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDTO } from 'src/app/models/product.model';
import { Categories } from 'src/app/models/util-DTOs/enumerations/categories.enum';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.scss']
})
export class CustomPaginatorComponent {
  @Input() products: ProductDTO[] = [
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
  currentPage: number = 1;
  @Input() pageTotalSize: number = 5;
  @Input() prodsLength: number = 0;  
  @Output() updatedFatherProducts: EventEmitter<ProductDTO[]> = new EventEmitter<ProductDTO[]>();

  
  /** Paginator variables */
  currentPageNew: number = 1;
  customPageSizeChanger: number[] = [5,10,15,20];

  
  /** Handles navigation to the previous page. */
  navigateBefore(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  /** Handles navigation to the next page. */
  navigateNext(): void {
    const maxPage = Math.ceil(this.products.length / this.pageTotalSize);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    }
  }
  
  /** Calculates the total pages. */
  pagesTotal(): number {
    return Math.ceil(this.products.length / this.pageTotalSize);
  }

  /** Returns the visible products for the current page. */
  visibleProducts(): ProductDTO[] {
    const startIndex = (this.currentPage - 1) * this.pageTotalSize;
    const endIndex = Math.min(startIndex + this.pageTotalSize, this.products.length);
    return this.products.slice(startIndex, endIndex);
  }

  updateListChild() {
    const newList = this.visibleProducts();
    console.log('newList :>> ', newList);
    this.updatedFatherProducts.emit(newList);
  }

  backOnFirstPage(){
    if(this.currentPage !== 1){ 
      this.currentPage = 1;
      this.updateListChild();
    }
  }
}
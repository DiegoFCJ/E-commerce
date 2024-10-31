import { Component, Input, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';

export interface Star {
  position: number;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit{
  @Input() product!: ProductDTO;
  @Input() widthOverride!: any;
  @Input() heightOverride!: any;

  salePrice!: number;

  constructor(private router: Router,private authUtilsService: AuthUtilsService) {
  }
  ngOnInit(): void {
    if (this.product) {
      this.salePrice =
        this.product.price - (this.product.price * this.product.discount) / 100;
    }
  }

  goToDetail() {
    this.router.navigate(['OfficeOasis/product-detail', this.product.id]);
  }

  addToCart(){
    if(this.authUtilsService.isLoggedIn()){

    }else{
      this.authUtilsService.handleNotLoggedCase()
    }
    
  }
}

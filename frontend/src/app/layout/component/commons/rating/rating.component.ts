import { Component, Input } from '@angular/core';
import { ProductDTO } from 'src/app/models/product.model';
import { Star } from '../cards/cards.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() product!: ProductDTO;
  stars: Star[] = [
    { position: 1 },
    { position: 2 },
    { position: 3 },
    { position: 4 },
    { position: 5 },
  ];

  starsFill(n: number): string {
    if (this.product.averageRating === n) {
      return 'star';
    } else if (this.product.averageRating > n) {
      if (this.product.averageRating < n + 0.5) {
        return 'star_half'; // TODO HO PERSO 2 ORE SULLA MEZZA STELLINA RISOLVIAMO PERFAVORE
      } else {
        return 'star';
      }
    }
    return 'star_border';
  }

  // Funzione per ottenere il colore in base al valore di averageRating
  /*getRatingColor(averageRating: number): string {
    switch (averageRating != null) {
      case averageRating<=0.5:
        return 'red';
      case averageRating>0.5 && averageRating<=1.5:
        return 'orange';
      case averageRating>1.5 && averageRating<=2.5:
        return 'yellow'; // Puoi personalizzare il colore tra giallo e arancione
      case averageRating>2.5 && averageRating<=3.5:
        return '#06ff00'; // Puoi personalizzare il colore tra giallo e verde
      case averageRating>3.5:
        return 'green';
      default:
        return 'black'; // Colore di fallback nel caso di valori non gestiti
    }
  }*/
}

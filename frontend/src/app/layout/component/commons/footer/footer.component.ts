import { Component } from '@angular/core';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';

/**
 * Component responsible for displaying the footer.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /**
   * Constructs the FooterComponent.
   * @param routeChange The service for managing route change subscriptions.
   */
  constructor(protected routeChange: RouteChangeSubscriptionService) {}
}
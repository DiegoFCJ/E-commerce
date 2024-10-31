import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user.model';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDawnMenuComponent implements OnInit {
  user!: UserDTO;

  constructor(
    protected routeChange: RouteChangeSubscriptionService,
    protected router: Router, 
    protected authUtilsService: AuthUtilsService) {}

  ngOnInit(): void {
    this.user = this.authUtilsService.getUser();
  }
}

import { Component, OnInit } from '@angular/core';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';

@Component({
  selector: 'app-add-new-addr-btn',
  templateUrl: './add-new-addr-btn.component.html',
  styleUrls: ['./add-new-addr-btn.component.scss']
})
export class AddNewAddrBtnComponent implements OnInit{

  constructor(protected routeChange: RouteChangeSubscriptionService){}

  ngOnInit(): void {
  }
  
  changeContent(content: string){
    this.routeChange.setSelectedMenuItem(content);
  }
}
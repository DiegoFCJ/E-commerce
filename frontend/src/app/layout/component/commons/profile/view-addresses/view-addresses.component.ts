import { Component, Input, OnInit } from '@angular/core';
import { AddressDTO } from 'src/app/models/address.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AddressService } from 'src/app/services/address.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';

export interface PeriodicElement {
  name: string;
  data: any;
  isEditing?: boolean;
}

@Component({
  selector: 'app-view-addresses',
  templateUrl: './view-addresses.component.html',
  styleUrls: ['./view-addresses.component.scss']
})
export class ViewAddressesComponent implements OnInit {

  @Input() foundAddresses: AddressDTO[] = [];

  addressSelections: SelectionModel<PeriodicElement>[] = [];
  addressColumnsToDisplays: string[][] = [];
  addressDataSources: MatTableDataSource<PeriodicElement>[] = [];

  constructor(
    private addrServ: AddressService,
    protected routServ: RouteChangeSubscriptionService) {}

  ngOnInit(): void {
    this.initializeTables();
  }

  initializeTables(): void {
    this.foundAddresses.forEach(address => {
      this.addressSelections.push(new SelectionModel<PeriodicElement>(true, []));
      this.addressColumnsToDisplays.push(['select', 'name', 'data']);
      this.addressDataSources.push(this.getAddressDataSource(address));
    });
  }

  getAddressDataSource(address: AddressDTO): MatTableDataSource<PeriodicElement> {
    const addressFields: string[] = Object.keys(address).filter(key => key !== 'anagraphicDTO');
    const dataSource = new MatTableDataSource<PeriodicElement>(this.flattenObject(address, addressFields));
    return dataSource;
  }

  private flattenObject(obj: any, fields: string[]): PeriodicElement[] {
    let result: PeriodicElement[] = [];
    for (let key of fields) {
      if (obj.hasOwnProperty(key)) {
        result.push({ name: key.toUpperCase(), data: obj[key], isEditing: false });
      }
    }
    return result;
  }

  deleteTable(id: number){
    console.log('id', id)
    this.addrServ.delete(id).subscribe({
      next: (res) => {
        const icon = res.message !== "Eliminato con successo!" ? notifications.ICO_WARNING : notifications.ICO_SUCCESS;
        NotificationService.showDynamicResponseAlert(icon, res.message, 4000)
        .then(() => window.location.reload());
      },
      error: (err) => {
        console.log(err.error);
        NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, err.error.message, 4000)
      },
    })
  }

  fetchData(data: any, i: number): void {
    this.foundAddresses[i].nationality = data.data[1].data;
    this.foundAddresses[i].name = data.data[2].data;
    this.foundAddresses[i].surname = data.data[3].data;
    this.foundAddresses[i].address = data.data[4].data;
    this.foundAddresses[i].residenceCity = data.data[5].data;
    this.foundAddresses[i].province = data.data[6].data;
    this.foundAddresses[i].cap = data.data[7].data;
    this.foundAddresses[i].number = data.data[8].data;

    this.updateAddress(this.foundAddresses[i]);
  }

  private updateAddress(address: AddressDTO){
    if(address){
      this.addrServ.update(address).subscribe({
        next: (res) => {
            console.log(res);
            const icon = res.message !== "Aggiornato con successo!" ? notifications.ICO_WARNING : notifications.ICO_SUCCESS;
            NotificationService.showDynamicResponseAlert(icon, res.message, 4000)
            .then(() => window.location.reload());
        },
        error: (err) => {
          console.log(err.error);
          NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, err.error.message, 4000)
        },
      })
    }
  }
}

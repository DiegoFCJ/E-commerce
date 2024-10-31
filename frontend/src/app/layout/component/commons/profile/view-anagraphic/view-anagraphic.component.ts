import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AnagraphicDTO } from 'src/app/models/anagraphic.model';
import { AnagraphicService } from 'src/app/services/anagraphic.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import { UserDTO } from 'src/app/models/user.model';

export interface PeriodicElement {
  name: string;
  data: any;
  isEditing?: boolean; // Aggiungi questa proprietà
}

@Component({
  selector: 'app-view-anagraphic',
  templateUrl: './view-anagraphic.component.html',
  styleUrls: ['./view-anagraphic.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewAnagraphicComponent implements OnInit {

  userSelection = new SelectionModel<PeriodicElement>(true, []);
  anagraphicSelection = new SelectionModel<PeriodicElement>(true, []);

  userDataSource = new MatTableDataSource<PeriodicElement>();
  anagraphicDataSource = new MatTableDataSource<PeriodicElement>();

  userColumnsToDisplay: string[] = ['select', 'name', 'data']
  anagraphicColumnsToDisplay: string[] = ['select', 'name', 'data'];

  @Input() foundAnagraphic!: AnagraphicDTO;

  constructor(
    private anagServ: AnagraphicService,
    private userServ: UserService) {}

  ngOnInit(): void {
    this.updateData();
  }

  updateData(): void {
    if (this.foundAnagraphic) {
      const userFields: string[] = Object.keys(this.foundAnagraphic.userDTO);
      const anagraphicFields: string[] = Object.keys(this.foundAnagraphic)
        .filter(key => key !== 'userDTO');
      
      this.userDataSource.data = this.flattenObject(this.foundAnagraphic.userDTO, userFields);
      this.anagraphicDataSource.data = this.flattenObject(this.foundAnagraphic, anagraphicFields);
    }
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

  fetchData(data: any, choice: string): void {
    if(choice === 'user'){
      this.foundAnagraphic.userDTO.email = data.data[1].data;
      this.foundAnagraphic.userDTO.username = data.data[2].data;

      console.log('user cliccato!: ', this.foundAnagraphic.userDTO);
      this.updateUser(this.foundAnagraphic.userDTO);

    } else if(choice === 'anagraphic'){
      this.foundAnagraphic.name = data.data[1].data;
      this.foundAnagraphic.surname = data.data[2].data;
      this.foundAnagraphic.gender = data.data[3].data;
      this.foundAnagraphic.nationality = data.data[4].data;
      this.foundAnagraphic.birthDate = data.data[5].data;

      console.log('anagraphic cliccato!: ', this.foundAnagraphic);
    this.updateAnagraphic(this.foundAnagraphic);
    }
  }


  private updateAnagraphic(anagraphic: AnagraphicDTO){
    if(anagraphic){
      this.anagServ.update(anagraphic).subscribe({
        next: (res) => {
            console.log(res);
            const icon = res.message !== "Creato con successo!" ? notifications.ICO_WARNING : notifications.ICO_SUCCESS;
            NotificationService.showDynamicResponseAlert(icon, res.message, 4000);
        },
        error: (err) => {
          console.log(err.error);
          NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, err.error.message, 4000)
        },
      })
    }
  }

  private updateUser(user: UserDTO){
    if(user){
      this.userServ.update(user).subscribe({
        next: (res) => {
            console.log(res);
            const icon = res.message !== "Aggiornato con successo!" ? notifications.ICO_WARNING : notifications.ICO_SUCCESS;
            NotificationService.showDynamicResponseAlert(icon, res.message, 4000);
        },
        error: (err) => {
          console.log(err.error);
          NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, err.error.message, 4000)
        },
      })
    }
  }
}
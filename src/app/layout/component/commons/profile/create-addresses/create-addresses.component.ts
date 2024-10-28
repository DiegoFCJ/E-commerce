import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import { AddressDTO } from 'src/app/models/address.model';
import { AnagraphicDTO } from 'src/app/models/anagraphic.model';
import { Roles } from 'src/app/models/util-DTOs/enumerations/roles.enum';
import { AddressService } from 'src/app/services/address.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';

const OPT = {
  appearance: "outline",
  hideRequiredMarker: true,
};

@Component({
  selector: 'app-create-addresses',
  templateUrl: './create-addresses.component.html',
  styleUrls: ['./create-addresses.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { ...OPT },
    }
  ]
})
export class CreateAddressesComponent implements OnInit {

  addressForm!: FormGroup;
  @Input() foundAnagraphic: AnagraphicDTO = {
    id: 0,
    name: '',
    surname: '',
    gender: '',
    nationality: '',
    birthDate: '',
    userDTO: {
      id: 0,
      email: "",
      username: "",
      role: Roles.USER,
      accountNonLocked: true
    }
  };

  foundAddress: AddressDTO = {
    id: 0,
    nationality: '',
    name: '',
    surname: '',
    address: '',
    residenceCity: '',
    province: '',
    cap: 0,
    number: '',
    anagraphicDTO: this.foundAnagraphic
  };

  nationalities: string[] = [
    'Italia', 'Francia', 'Germania', 'Spagna', 'Regno Unito', 'Stati Uniti', 'Giappone', 'Cina',
    'India', 'Brasile', 'Russia', 'Canada', 'Australia', 'Messico', 'Argentina', 'Svezia', 'Norvegia',
    'Danimarca', 'Olanda', 'Portogallo', 'Grecia', 'Svizzera', 'Austria', 'Belgio', 'Irlanda', 'Polonia',
    'Turchia', 'Corea del Sud', 'Singapore', 'Israele', 'Arabia Saudita'
  ];

  constructor(private formBuilder: FormBuilder, private addrServ: AddressService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.addressForm = this.formBuilder.group({
      nationality: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      residenceCity: ['', [Validators.required]],
      province: ['', [Validators.required]],
      cap: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  fetchData(): void {      
    if (this.addressForm.valid) {
      console.log(
        'nationality: ', this.addressForm.get('nationality')?.value,
        'name: ', this.addressForm.get('name')?.value,
        'surname: ', this.addressForm.get('surname')?.value,
        'address: ', this.addressForm.get('address')?.value,
        'residenceCity: ', this.addressForm.get('residenceCity')?.value,
        'province: ', this.addressForm.get('province')?.value,
        'cap: ', this.addressForm.get('cap')?.value,
        'phoneNumber: ', this.addressForm.get('phoneNumber')?.value);

        this.foundAddress.nationality = this.addressForm.get('nationality')?.value;
        this.foundAddress.name = this.addressForm.get('name')?.value;
        this.foundAddress.surname = this.addressForm.get('surname')?.value;
        this.foundAddress.address = this.addressForm.get('address')?.value;
        this.foundAddress.residenceCity = this.addressForm.get('residenceCity')?.value;
        this.foundAddress.province = this.addressForm.get('province')?.value;
        this.foundAddress.cap = this.addressForm.get('cap')?.value;
        this.foundAddress.number = this.addressForm.get('phoneNumber')?.value;
        this.foundAddress.anagraphicDTO = this.foundAnagraphic;
  
      console.log("Dati inseriti dall'utente: ", this.foundAddress);
      this.createAddress(this.foundAddress);
    } else {
      console.log('Il form non è valido. Controlla i campi evidenziati.');
    }
  }

  private createAddress(address: AddressDTO) {
    console.log("Dati inseriti dall'utente: ", address);
    if (address) {
      this.addrServ.create(address).subscribe({
        next: (res) => {
          console.log(res);
          const icon = res.message !== "Creato con successo!" ? notifications.ICO_WARNING : notifications.ICO_SUCCESS;
          NotificationService.showDynamicResponseAlert(icon, res.message, 4000)
            .then(() => window.location.reload());
        },
        error: (err) => {
          console.log(err.error.message);
          this.updateAddress(address);
        },
      });
    }
  }

  private updateAddress(address: AddressDTO) {
    if (address) {
      this.addrServ.update(address).subscribe({
        next: (res) => {
          console.log(res);
          const icon = res.message !== "Creato con successo!" ? notifications.ICO_WARNING : notifications.ICO_SUCCESS;
          NotificationService.showDynamicResponseAlert(icon, res.message, 4000);
        },
        error: (err) => {
          console.log(err.error);
          NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, err.error.message, 4000)
            .then(() => window.location.reload());
        },
      });
    }
  }
}
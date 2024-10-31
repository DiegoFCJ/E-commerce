import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AnagraphicDTO } from 'src/app/models/anagraphic.model';
import { UserDTO } from 'src/app/models/user.model';
import { Roles } from 'src/app/models/util-DTOs/enumerations/roles.enum';
import { AnagraphicService } from 'src/app/services/anagraphic.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import * as notifications from 'src/app/constants/sweat-alert.constant';

const OPT = {
  appearance: "outline",
  hideRequiredMarker: true,
}

@Component({
  selector: 'app-create-anagraphic',
  templateUrl: './create-anagraphic.component.html',
  styleUrls: ['./create-anagraphic.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { ...OPT },
    }
  ]
})
export class CreateAnagraphicComponent implements OnInit {

  form!: FormGroup;
  @Input() user: UserDTO = {
    id: 0,
    email: "",
    username: "",
    role: Roles.USER,
    accountNonLocked: true,
  };

  genders: string[] = [
    'Uomo', 'Donna', 'Elicottero d\'Assalto', 'Gufi', 'Non-binario', 'Alieno', 'Unicorno',
    'Ninja', 'Robot', 'Trans', 'Pansessuale', 'Genderqueer', 'Bigender', 'Genderfluid', 'Agender',
    'Demiboy', 'Demigirl', 'Demigod', 'God', 'Allfather', 'Grut', 'Two-Spirit', 'Androgino', 'Altri'
  ];

  nationalities: string[] = [
    'Italia', 'Francia', 'Germania', 'Spagna', 'Regno Unito', 'Stati Uniti', 'Giappone', 'Cina',
    'India', 'Brasile', 'Russia', 'Canada', 'Australia', 'Messico', 'Argentina', 'Svezia', 'Norvegia',
    'Danimarca', 'Olanda', 'Portogallo', 'Grecia', 'Svizzera', 'Austria', 'Belgio', 'Irlanda', 'Polonia',
    'Turchia', 'Corea del Sud', 'Singapore', 'Israele', 'Arabia Saudita'
  ];

  constructor(private formBuilder: FormBuilder, private anagServ: AnagraphicService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      nationality: ['', [Validators.required]]
    });
  }

  fetchData(): void {
    if (this.form.valid) {
      const name = this.form.get('name')?.value || '';
      const surname = this.form.get('surname')?.value || '';
      const birthDate = this.form.get('birthDate')?.value || '';
      const nationality = this.form.get('nationality')?.value || '';
      const gender = this.form.get('gender')?.value || '';
  
      const anagraphic: AnagraphicDTO = {
        id: 0,
        name: name,
        surname: surname,
        birthDate: birthDate,
        nationality: nationality,
        gender: gender,
        userDTO: this.user
      };
  
      console.log("Dati inseriti dall'utente: ", anagraphic);
      this.createAnagraphic(anagraphic);
    } else {
      console.log('Il form non è valido. Controlla i campi evidenziati.');
    }
  }
  
  private createAnagraphic(anagraphic: AnagraphicDTO){
    if(anagraphic){
      this.anagServ.create(anagraphic).subscribe({
        next: (res) => {
            console.log(res);
            const icon = res.message !== "Creato con successo!" ? notifications.ICO_WARNING : notifications.ICO_SUCCESS;
            NotificationService.showDynamicResponseAlert(icon, res.message, 4000)
            .then(() => window.location.reload())
        },
        error: (err) => {
          console.log(err.error.message);
          this.updateAnagraphic(anagraphic);
        },
      })
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
          .then(() => window.location.reload())
        },
      })
    }
  }

}

import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../profile/view-anagraphic/view-anagraphic.component';

@Component({
  selector: 'app-dynamic-table-data-edit',
  templateUrl: './dynamic-table-data-edit.component.html',
  styleUrls: ['./dynamic-table-data-edit.component.scss']
})
export class DynamicTableDataEditComponent {
  @Input() selection = new SelectionModel<PeriodicElement>(true, []);
  @Input() dataSource = new MatTableDataSource<PeriodicElement>();
  @Input() columnsToDisplay: string[] = ['select', 'name', 'data'];

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

  isAllSelected(dataSource: any, selection: any) {
    const numSelected = selection.selected.length;
    const numRows = dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(dataSource: MatTableDataSource<PeriodicElement>, selection: SelectionModel<PeriodicElement>) {
    if (this.isAllSelected(dataSource, selection)) {
      selection.clear();
      dataSource.data.forEach(row => row.isEditing = false); // Disattiva la modalità di editing
    } else {
      selection.select(...dataSource.data);
      dataSource.data.forEach(row => row.isEditing = true); // Attiva la modalità di editing
    }
  }
  

  toggleEditing(element: PeriodicElement, event: any): void {
    element.isEditing = event.checked;
  }

  booleanCheck(value: any) {
    if (typeof value === 'boolean') {
      return value ? 'verified' : 'new_releases';
    } else {
      return value;
    }
  }

  isDataChecked(condition: string, element: any){
    switch (condition) {
      case 'isEAndNotData':
        return element.isEditing &&
        element.name !== 'ID' &&
        element.name !== 'PASSWORD' &&
        element.name !== 'CREATEDAT' &&
        element.name !== 'ROLE' &&
        element.name !== 'ENABLED' &&
        element.name !== 'ACCOUNTNONLOCKED';
    
      case 'isNotEOrData':
        return !element.isEditing && (
          element.name === 'ID' ||
          element.name === 'EMAIL' ||
          element.name === 'USERNAME' ||
          element.name === 'PASSWORD' ||
          element.name === 'CREATEDAT' ||
          element.name === 'ROLE' ||
          element.name === 'ENABLED' ||
          element.name === 'ACCOUNTNONLOCKED' ||
          element.name === 'NAME' ||
          element.name === 'SURNAME' ||
          element.name === 'GENDER'||
          element.name === 'NATIONALITY' ||
          element.name === 'BIRTHDATE' ||
          element.name === 'ADDRESS' ||
          element.name === 'RESIDENCECITY'||
          element.name === 'PROVINCE' ||
          element.name === 'CAP' ||
          element.name === 'NUMBER')

      case 'isEOrData':
        return element.isEditing && (
          element.name === 'ID' ||
          element.name === 'PASSWORD' ||
          element.name === 'CREATEDAT' ||
          element.name === 'ROLE' ||
          element.name === 'ENABLED' ||
          element.name === 'ACCOUNTNONLOCKED')
        
      default:
        return false;
    }
  }

}

import { AnagraphicDTO } from "./anagraphic.model";

//model
export interface AddressDTO {
    id: number;
    nationality: string;
    name: string;
    surname: string;
    address: string;
    residenceCity: string;
    province: string;
    cap: number;
    number: string;
    anagraphicDTO: AnagraphicDTO;
  }

//id
export interface AddressIdDTO {
  id: number;
}
  
//requests

//responses
export interface AddressResponse {
  message: string;
  data: AddressDTO;
}

export interface AddressArrayResponse {
  message: string;
  data: AddressDTO[];
}

//others
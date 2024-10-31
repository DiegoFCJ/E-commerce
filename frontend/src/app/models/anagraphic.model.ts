import { UserDTO } from "./user.model";

// model
export interface AnagraphicDTO {
  id: number;
  name: string;
  surname: string;
  gender: string;
  nationality: string;
  birthDate: string;
  userDTO: UserDTO;
}

// id
export interface AnagraphicIdDTO {
  id: number;
}
  
// requests

// responses
export interface AnagraphicResponse {
  message: string;
  data: AnagraphicDTO;
}

// others
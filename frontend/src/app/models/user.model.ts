import { Roles } from "./util-DTOs/enumerations/roles.enum";

// model
export interface UserDTO {
  id: number;
  email: string;
  username: string;
  role: Roles;
  accountNonLocked: boolean;
}

// id
export interface UserIdDTO {
  id: number;
}
  
// requests
export interface FindByEoURequest{
  id: number;
  email: string;
  username: string;
  accountNonLocked: boolean;
  isEnabled: boolean;
}

// responses
export interface FindByEoUResponse {
  data: FindByEoURequest;
  message: string;
}

//other
// export interface UserDTO {
//   id: number;
//   email: string;
//   password: string;
//   role: Roles;
// }
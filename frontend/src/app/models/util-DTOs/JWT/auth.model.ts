import { UserDTO,  } from "../../user.model";

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: UserDTO;
  message: string;
  token: string;
}
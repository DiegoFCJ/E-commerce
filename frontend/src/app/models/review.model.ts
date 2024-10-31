import { UserDTO } from "./user.model";
import { ProductDTO } from "./product.model";

// model
export interface ReviewDTO {
    id: number;
    description: string;
    rating: number;
    userDTO: UserDTO;
    productDTO: ProductDTO;
}

// id
export interface ReviewIdDTO {
    id: number;
}

// requests

// responses
export interface ReviewResponse{
    message:string;
    data:ReviewDTO;
}

// others
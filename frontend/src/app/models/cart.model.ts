import { ProductDetailDTO } from "./product-detail.models";
import { ProductDTO } from "./product.model";
import { UserDTO } from "./user.model";

// model
export interface CartDTO {
  id: number;
  userDTO: UserDTO ;
  productDetailDTOList: ProductDetailDTO[];
}

//id
export interface CartIdDTO {
  id: number;
}
  
//requests

//responses
export interface ProductsCountResponse {
  message: string;
  data: ProductsCountDTOList;
}

export interface CartResponse {
  message: string;
  data: CartDTO;
}

//others
// quanti prodotti non venduti ma attualmente sul carrello
export interface ProductsCountDTOList {
  count: number;
  productDTO: ProductDTO[];
}
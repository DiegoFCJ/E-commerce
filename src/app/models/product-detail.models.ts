import { ProductDTO } from "./product.model";
import { Colors } from "./util-DTOs/enumerations/colors.enum";

// model
export interface ProductDetailDTO{
    id:number;
    colors:Colors;
    quantity:number;
    productDTO:ProductDTO;
}

//id
export interface ProductDetailIdDTO{
    id:number;
}

//requests

//responses
export interface ProductDetailResponse{
    message: string;
    data: ProductDetailDTO;
}

export interface ProductDetailListResponse{
    message: string;
    data: ProductDetailDTO[];
}

// others
import { Categories } from "./util-DTOs/enumerations/categories.enum";
import { OrderBy } from "./util-DTOs/enumerations/order-by.enum";

// model
export interface ProductDTO {
    id: number;
    name: string;
    price: number;
    description: string;
    category: Categories;
    discount: number;
    averageRating: number;
}

//id
export interface ProductIdDTO {
    id: number;
}

// requests
export interface SearchRequest{
    name: string;
    category: Categories;
    orderBy: OrderBy;
}

// responses
export interface ProductResponse{
    message:string;
    data:ProductDTO;
}

export interface GetAllProductsResponse{
    message:string;
    data:ProductDTO[];
}

// others
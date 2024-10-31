import { AnagraphicDTO } from "./anagraphic.model";
import { ProductDetailDTO } from "./product-detail.models";

// model
export interface PurchaseHistoryDTO{
    id: number;
    totalPurchase: number;
    purchaseDate: Date;
    deliveryDate: Date;
    deliveryState: string;
    productDetailDTOList: ProductDetailDTO[];
    anagraphicDTO: AnagraphicDTO;
}

// id
export interface PurchaseHistoryIdDTO{
    id: number;
}

// requests

// responses
export interface PurchaseHistoryResponse{
    message:string;
    data:PurchaseHistoryDTO;
}

// others
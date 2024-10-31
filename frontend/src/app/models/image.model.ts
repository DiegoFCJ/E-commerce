import { AnagraphicDTO, AnagraphicIdDTO } from "./anagraphic.model"
import { ProductDTO, ProductIdDTO } from "./product.model"

// model
export interface ImageDTO {
  id: number;
  name: string;
  type: string;
  filePath: string;
  anagraphicDTO: AnagraphicDTO;
  productDTO: ProductDTO;
}

//id
export interface ImageIdDTO {
  id: number;
}

//requests
export interface CreateImageRequest {
  file: any;
  anagraphicDTO: AnagraphicIdDTO;
  productDTO: ProductIdDTO;
}

export interface CreateProfileImageRequest {
  file: any;
  anagraphicDTO: AnagraphicIdDTO;
}

export interface CreateProductImageRequest {
  file: any;
  productDTO: ProductIdDTO;
}

//responses
export interface CreateImageResponse {
  message: string;
  data: CreateImageRequest;
}

//others
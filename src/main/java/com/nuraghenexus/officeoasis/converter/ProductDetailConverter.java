package com.nuraghenexus.officeoasis.converter;

import com.nuraghenexus.officeoasis.dto.ProductDetailDTO;
import com.nuraghenexus.officeoasis.model.ProductDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This component class converts ProductDetail objects to ProductDetailDTO objects and vice versa.
 */
@Component
public class ProductDetailConverter extends AbstractConverter<ProductDetail, ProductDetailDTO>{

    @Autowired
    private ProductConverter productConverter;

    /**
     * Converts a ProductDetailDTO object to a ProductDetail object.
     *
     * @param productDetailDTO The ProductDetailDTO object to be converted.
     * @return A ProductDetail object.
     */
    @Override
    public ProductDetail toEntity(ProductDetailDTO productDetailDTO) {
        ProductDetail productDetail = null;
        if (productDetailDTO != null) {
            productDetail = new ProductDetail(
                    productDetailDTO.getId(),
                    productDetailDTO.getColors(),
                    productDetailDTO.getQuantity(),
                    productConverter.toEntity(productDetailDTO.getProductDTO())
            );
        }
        return productDetail;
    }

    /**
     * Converts a ProductDetail object to a ProductDetailDTO object.
     *
     * @param productDetail The ProductDetail object to be converted.
     * @return A ProductDetailDTO object.
     */
    @Override
    public ProductDetailDTO toDTO(ProductDetail productDetail) {
        ProductDetailDTO productDetailDTO = null;
        if(productDetail != null){
            productDetailDTO = new ProductDetailDTO(
                    productDetail.getId(),
                    productDetail.getColor(),
                    productDetail.getQuantity(),
                    productConverter.toDTO(productDetail.getProduct())
            );
        }
        return productDetailDTO;
    }
}

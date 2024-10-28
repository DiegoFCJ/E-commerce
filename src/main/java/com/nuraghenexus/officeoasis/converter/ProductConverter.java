package com.nuraghenexus.officeoasis.converter;

import com.nuraghenexus.officeoasis.dto.ProductDTO;
import com.nuraghenexus.officeoasis.model.Product;
import org.springframework.stereotype.Component;

/**
 * This component class converts Product objects to ProductDTO objects and vice versa.
 */
@Component
public class ProductConverter extends AbstractConverter<Product, ProductDTO>{

    /**
     * Converts a ProductDTO object to a Product object.
     *
     * @param productDTO The ProductDTO object to be converted.
     * @return A Product object.
     */
    @Override
    public Product toEntity(ProductDTO productDTO) {
        Product product = null;
        if (productDTO != null) {
            product = new Product(
                    productDTO.getId(),
                    productDTO.getName(),
                    productDTO.getPrice(),
                    productDTO.getDescription(),
                    productDTO.getCategory(),
                    productDTO.getDiscount(),
                    productDTO.getAverageRating()
            );
        }
        return product;
    }

    /**
     * Converts a Product object to a ProductDTO object.
     *
     * @param product The Product object to be converted.
     * @return A ProductDTO object.
     */
    @Override
    public ProductDTO toDTO(Product product) {
        ProductDTO productDTO = null;
        if(product != null){
            productDTO = new ProductDTO(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getDescription(),
                    product.getCategory(),
                    product.getDiscount(),
                    product.getAverageRating()
            );
        }
        return productDTO;
    }
}

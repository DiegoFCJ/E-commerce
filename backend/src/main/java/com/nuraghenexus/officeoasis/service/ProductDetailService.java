package com.nuraghenexus.officeoasis.service;

import java.util.*;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.converter.ProductDetailConverter;
import com.nuraghenexus.officeoasis.dto.ProductDetailDTO;
import com.nuraghenexus.officeoasis.model.ProductDetail;
import com.nuraghenexus.officeoasis.repository.ProductDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductDetailService extends AbstractService<ProductDetail, ProductDetailDTO> {

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private ProductDetailConverter productDetailConverter;


    /**
     * Updates the quantity of color products.
     * @param dtoList List of ProductDetailDTO objects containing updated quantity information.
     * @return A message indicating the success or failure of the update operation.
     */
    public String updateQuantity(List<ProductDetailDTO> dtoList) {
        // Create a map to track the quantities to subtract for each product
        Map<Long, Integer> quantityMap = new HashMap<>();

        try {
            // Calculate the total quantity to subtract for each product
            for (ProductDetailDTO dto : dtoList) {
                Long productId = dto.getId();
                quantityMap.put(productId, quantityMap.getOrDefault(productId, 0) + 1);
            }

            // Update the quantity for each product
            for (ProductDetailDTO dto : dtoList) {
                Long productId = dto.getId();
                int totalQuantityToSubtract = quantityMap.get(productId);

                // Calculate the new quantity for the product
                int newQuantity = dto.getQuantity() - totalQuantityToSubtract;

                // Create a new DTO with the updated quantity
                ProductDetailDTO newDTO = new ProductDetailDTO(
                        dto.getId(),
                        dto.getColors(),
                        newQuantity,
                        dto.getProductDTO()
                );

                // Update the product in the system
                update(newDTO);
            }
            return API.COL_PROD_SUCCESS;
        } catch (Exception ex) {
            return ex.getCause().getMessage();
        }
    }

    /**
     * Retrieves details of a color product based on the provided ID.
     * @param id The ID of the color product to retrieve details for.
     * @return A map containing the details of the color product.
     */
    public Map<String, Object> detailProduct(Long id) {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            List<ProductDetail> colorProdOptional = productDetailRepository.findAll().stream()
                    .filter(colorProds -> colorProds.getProduct().getId().equals(id))
                    .toList();

            if (!colorProdOptional.isEmpty()) {
                List<ProductDetailDTO> colorProdsDTO = productDetailConverter.toDTOList(colorProdOptional.stream().toList());
                map.put(API.GEN_MSG, API.GEN_FOUND);
                map.put(API.GEN_DATA, colorProdsDTO);
            } else {
                map.put(API.GEN_MSG, API.GEN_NOT_FOUND);
            }
            return map;
        } catch (Exception e) {
            map.put(API.GEN_MSG, e.getCause().getMessage());
            return map;
        }
    }
}
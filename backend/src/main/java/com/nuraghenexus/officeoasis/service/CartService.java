package com.nuraghenexus.officeoasis.service;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.converter.ProductDetailConverter;
import com.nuraghenexus.officeoasis.dto.utils.ProductCountResponse;
import com.nuraghenexus.officeoasis.dto.CartDTO;
import com.nuraghenexus.officeoasis.dto.ProductDTO;
import com.nuraghenexus.officeoasis.model.Cart;
import com.nuraghenexus.officeoasis.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * CartService is a service class responsible for handling cart-related operations.
 */
@Service
public class CartService extends AbstractService<Cart, CartDTO>{

    @Autowired
    private ProductDetailConverter productDetailConverter;

    @Autowired
    private CartRepository repository;

    /**
     * Counts the number of items in the cart.
     *
     * @return A map containing the result of the operation, including the count of each product in the cart.
     */
    public Map<String, Object> countCart(){
        Map<String, Object> map = new LinkedHashMap<>();
        try{
            Map<ProductDTO, Integer> productsCounts = repository.findAll().stream()
                    .flatMap(Cart -> Cart.getProductDetailList().stream())
                    .map(productDetailConverter::toDTO)
                    .collect(HashMap::new,
                            (m, p) -> m.merge(p.getProductDTO(), 1, Integer::sum),
                            HashMap::putAll);

            List<ProductCountResponse> prodsCountList = productsCounts.entrySet().stream()
                    .map(entry -> new ProductCountResponse(entry.getKey(), entry.getValue()))
                    .toList();

            map.put(API.GEN_MSG, API.CART_COUNT_SUCCESS);
            map.put(API.GEN_DATA, prodsCountList);

            return map;
        }catch (Exception ex){
            map.put(API.GEN_MSG, ex.getMessage()); // Potremmo desiderare di utilizzare getMessage() anziché getCause().getMessage()
            return map;
        }
    }

    /**
     * Retrieves cart data by user ID.
     *
     * @param id The ID of the user.
     * @return A map containing the result of the operation, including the cart data if found.
     */
    public Map<String, Object> readByUserId(Long id) {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            Optional<Cart> cartOptional = repository.findAll().stream()
                    .filter(cart -> cart.getUser().getId().equals(id))
                    .findFirst();

            if (cartOptional.isPresent()) {
                CartDTO cartDTO = converter.toDTO(cartOptional.get());
                map.put(API.GEN_MSG, API.GEN_FOUND);
                map.put(API.GEN_DATA, cartDTO);
            } else {
                map.put(API.GEN_MSG, API.GEN_NOT_FOUND);
            }

            return map;
        } catch (Exception e) {
            map.put(API.GEN_MSG, e.getMessage()); // Potremmo desiderare di utilizzare getMessage() anziché getCause().getMessage()
            return map;
        }
    }

}
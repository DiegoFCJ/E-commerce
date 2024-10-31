package com.nuraghenexus.officeoasis.converter;

import com.nuraghenexus.officeoasis.dto.CartDTO;
import com.nuraghenexus.officeoasis.model.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This component class converts Cart objects to CartDTO objects and vice versa.
 */
@Component
public class CartConverter extends AbstractConverter<Cart, CartDTO>{

    @Autowired
    private UserConverter userConverter;
    @Autowired
    private ProductDetailConverter productDetailConverter;

    /**
     * Converts a CartDTO object to a Cart object.
     *
     * @param cartDTO The CartDTO object to be converted.
     * @return A Cart object.
     */
    @Override
    public Cart toEntity(CartDTO cartDTO) {
        Cart cart = null;
        if (cartDTO != null) {
            cart = new Cart(
                    cartDTO.getId(),
                    userConverter.toEntity(cartDTO.getUserDTO()),
                    productDetailConverter.toEntityList(cartDTO.getProductDetailDTOList())
            );
        }
        return cart;
    }

    /**
     * Converts a Cart object to a CartDTO object.
     *
     * @param cart The Cart object to be converted.
     * @return A CartDTO object.
     */
    @Override
    public CartDTO toDTO(Cart cart) {
        CartDTO cartDTO = null;
        if(cart != null){
            cartDTO = new CartDTO(
                    cart.getId(),
                    userConverter.toDTO(cart.getUser()),
                    productDetailConverter.toDTOList(cart.getProductDetailList())
            );
        }
        return cartDTO;
    }
}

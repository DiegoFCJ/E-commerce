package com.nuraghenexus.officeoasis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {

    private Long id;
    private UserDTO userDTO;
    private List<ProductDetailDTO> productDetailDTOList;
}

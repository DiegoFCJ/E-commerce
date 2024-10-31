package com.nuraghenexus.officeoasis.dto;

import com.nuraghenexus.officeoasis.model.enumerations.Colors;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailDTO {

    private Long id;
    private Colors colors;
    private int quantity;
    private ProductDTO productDTO;
}

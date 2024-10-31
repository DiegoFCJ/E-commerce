package com.nuraghenexus.officeoasis.dto.utils;

import com.nuraghenexus.officeoasis.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCountResponse {

    private ProductDTO productDTO;
    private int count;
}

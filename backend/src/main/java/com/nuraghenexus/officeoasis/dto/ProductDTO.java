package com.nuraghenexus.officeoasis.dto;

import com.nuraghenexus.officeoasis.model.enumerations.Categories;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private double price;
    private String description;
    private Categories category;
    private int discount;
    private double averageRating;
}

package com.nuraghenexus.officeoasis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {

    private Long id;
    private String title;
    private String description;
    private int rating;
    private AnagraphicDTO anagraphicDTO;
    private ProductDTO productDTO;
}
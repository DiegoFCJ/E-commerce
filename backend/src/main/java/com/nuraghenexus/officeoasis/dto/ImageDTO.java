package com.nuraghenexus.officeoasis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageDTO {

    private Long id;
    private String name;
    private String type;
    private String filePath;
    private AnagraphicDTO anagraphicDTO;
    private ProductDTO productDTO;
}
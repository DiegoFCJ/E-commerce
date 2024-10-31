package com.nuraghenexus.officeoasis.dto.utils;

import com.nuraghenexus.officeoasis.dto.AnagraphicDTO;
import com.nuraghenexus.officeoasis.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateImageRequest {

    Map<String, Object> file;
    ProductDTO productDTO;
    AnagraphicDTO anagraphicDTO;
}

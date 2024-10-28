package com.nuraghenexus.officeoasis.dto.utils;

import com.nuraghenexus.officeoasis.model.enumerations.Categories;
import com.nuraghenexus.officeoasis.model.enumerations.OrderBy;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchRequest {

    private String name;
    private Categories category;
    private OrderBy orderBy;
}
package com.nuraghenexus.officeoasis.dto.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindByEoURequest {

    private Long id;
    private String email;
    private String username;
    private boolean accountNonLocked;
    private boolean isEnabled;

}
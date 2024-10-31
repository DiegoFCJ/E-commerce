package com.nuraghenexus.officeoasis.dto.utils;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String email;
    private String username;
    private String password;
}

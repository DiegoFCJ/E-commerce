package com.nuraghenexus.officeoasis.dto.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordRecoveryRequest {

    String password;
    String token;
}

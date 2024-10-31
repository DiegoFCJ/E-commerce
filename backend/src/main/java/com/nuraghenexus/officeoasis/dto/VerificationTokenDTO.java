package com.nuraghenexus.officeoasis.dto;

import com.nuraghenexus.officeoasis.dto.utils.FindByEoURequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerificationTokenDTO {

    private Long id;
    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;
    private LocalDateTime confirmedAt;
    private FindByEoURequest findByEoURequest;
}
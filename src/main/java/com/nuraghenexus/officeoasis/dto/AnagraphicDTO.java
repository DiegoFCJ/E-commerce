package com.nuraghenexus.officeoasis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnagraphicDTO {

    private Long id;
    private String name;
    private String surname;
    private String gender;
    private String nationality;
    private String birthDate;
    private UserDTO userDTO;
}
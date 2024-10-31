package com.nuraghenexus.officeoasis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {

    private Long id;
    private String nationality;
    private String name;
    private String surname;
    private String address;
    private String residenceCity;
    private String province;
    private String cap;
    private String number;
    private AnagraphicDTO anagraphicDTO;
}

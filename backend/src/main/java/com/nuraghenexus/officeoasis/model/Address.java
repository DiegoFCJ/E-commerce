package com.nuraghenexus.officeoasis.model;

import lombok.*;
import jakarta.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nationality;

    private String name;

    private String surname;

    private String address;

    private String residenceCity;

    private String province;

    private String cap;

    private String number;

    @ManyToOne(cascade = CascadeType.DETACH)
    private Anagraphic anagraphic;
}

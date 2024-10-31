package com.nuraghenexus.officeoasis.model;

import lombok.*;
import jakarta.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Anagraphic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String surname;
    private String gender;
    private String nationality;
    private String birthDate;

    @OneToOne
    private User user;
}
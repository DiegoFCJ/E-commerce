package com.nuraghenexus.officeoasis.model;

import lombok.*;
import jakarta.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private int rating;

    @ManyToOne
    private Anagraphic anagraphic;

    @ManyToOne
    private Product product;

}

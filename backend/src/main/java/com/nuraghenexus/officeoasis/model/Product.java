package com.nuraghenexus.officeoasis.model;

import com.nuraghenexus.officeoasis.model.enumerations.Categories;
import lombok.*;
import jakarta.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private String description;
    private Categories category;
    private int discount;
    private double averageRating;
}
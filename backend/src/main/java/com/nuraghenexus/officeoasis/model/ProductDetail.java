package com.nuraghenexus.officeoasis.model;

import com.nuraghenexus.officeoasis.model.enumerations.Colors;
import lombok.*;
import jakarta.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class ProductDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Colors color;

    private int quantity;

    @ManyToOne
    private Product product;

}

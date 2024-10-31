package com.nuraghenexus.officeoasis.model;

import lombok.*;
import jakarta.persistence.*;
import java.util.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne
    private User user;

    @ManyToMany
    @Column(name = "product_detail_id")
    private List<ProductDetail> productDetailList;

}
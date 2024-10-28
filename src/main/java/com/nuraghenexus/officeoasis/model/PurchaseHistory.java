package com.nuraghenexus.officeoasis.model;

import com.nuraghenexus.officeoasis.model.enumerations.StatusOrder;
import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class PurchaseHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double totalPurchase;

    private LocalDateTime purchaseDate;

    private LocalDateTime deliveryDate;

    private StatusOrder DeliveryState;

    @ManyToOne
    private Anagraphic anagraphic;

    @ManyToMany
    @Column(name = "product_detail_id")
    private List<ProductDetail> productDetailList;
}
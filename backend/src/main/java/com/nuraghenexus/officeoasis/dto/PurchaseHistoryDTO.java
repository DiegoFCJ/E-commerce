package com.nuraghenexus.officeoasis.dto;

import com.nuraghenexus.officeoasis.model.enumerations.StatusOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseHistoryDTO {

    private Long id;
    private double totalPurchase;
    private LocalDateTime purchaseDate;
    private LocalDateTime deliveryDate;
    private StatusOrder DeliveryState;
    private AnagraphicDTO anagraphicDTO;
    private List<ProductDetailDTO> productDetailDTOList;

}

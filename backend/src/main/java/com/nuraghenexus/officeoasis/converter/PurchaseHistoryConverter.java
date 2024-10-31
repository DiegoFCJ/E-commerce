package com.nuraghenexus.officeoasis.converter;

import com.nuraghenexus.officeoasis.dto.PurchaseHistoryDTO;
import com.nuraghenexus.officeoasis.model.PurchaseHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This component class converts PurchaseHistory objects to PurchaseHistoryDTO objects and vice versa.
 */
@Component
public class PurchaseHistoryConverter extends AbstractConverter<PurchaseHistory, PurchaseHistoryDTO>{

    @Autowired
    private AnagraphicConverter anagraphicConverter;
    @Autowired
    private ProductDetailConverter productDetailConverter;

    /**
     * Converts a PurchaseHistoryDTO object to a PurchaseHistory object.
     *
     * @param purchaseHistoryDTO The PurchaseHistoryDTO object to be converted.
     * @return A PurchaseHistory object.
     */
    @Override
    public PurchaseHistory toEntity(PurchaseHistoryDTO purchaseHistoryDTO) {
        PurchaseHistory purchaseHistory = null;
        if (purchaseHistoryDTO != null) {
            purchaseHistory = new PurchaseHistory(
                    purchaseHistoryDTO.getId(),
                    purchaseHistoryDTO.getTotalPurchase(),
                    purchaseHistoryDTO.getPurchaseDate(),
                    purchaseHistoryDTO.getDeliveryDate(),
                    purchaseHistoryDTO.getDeliveryState(),
                    anagraphicConverter.toEntity(purchaseHistoryDTO.getAnagraphicDTO()),
                    productDetailConverter.toEntityList(purchaseHistoryDTO.getProductDetailDTOList())
            );
        }
        return purchaseHistory;
    }

    /**
     * Converts a PurchaseHistory object to a PurchaseHistoryDTO object.
     *
     * @param purchaseHistory The PurchaseHistory object to be converted.
     * @return A PurchaseHistoryDTO object.
     */
    @Override
    public PurchaseHistoryDTO toDTO(PurchaseHistory purchaseHistory) {
        PurchaseHistoryDTO purchaseHistoryDTO = null;
        if(purchaseHistory != null){
            purchaseHistoryDTO = new PurchaseHistoryDTO(
                    purchaseHistory.getId(),
                    purchaseHistory.getTotalPurchase(),
                    purchaseHistory.getPurchaseDate(),
                    purchaseHistory.getDeliveryDate(),
                    purchaseHistory.getDeliveryState(),
                    anagraphicConverter.toDTO(purchaseHistory.getAnagraphic()),
                    productDetailConverter.toDTOList(purchaseHistory.getProductDetailList())
            );
        }
        return purchaseHistoryDTO;
    }
}

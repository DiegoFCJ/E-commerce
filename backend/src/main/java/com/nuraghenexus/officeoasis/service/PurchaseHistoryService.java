package com.nuraghenexus.officeoasis.service;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.converter.ProductDetailConverter;
import com.nuraghenexus.officeoasis.dto.utils.ProductCountResponse;
import com.nuraghenexus.officeoasis.dto.ProductDTO;
import com.nuraghenexus.officeoasis.dto.PurchaseHistoryDTO;
import com.nuraghenexus.officeoasis.model.PurchaseHistory;
import com.nuraghenexus.officeoasis.repository.PurchaseHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

/**
 * This service class provides functionality related to purchase history.
 */
@Service
public class PurchaseHistoryService extends AbstractService<PurchaseHistory, PurchaseHistoryDTO>{
    @Autowired
    private ProductDetailConverter productDetailConverter;

    @Autowired
    private PurchaseHistoryRepository repository;

    @Autowired
    private ProductDetailService productDetailService;

    /**
     * Retrieves a list of popular products based on purchase history.
     * @return A map containing the list of popular products and a message.
     */
    public Map<String, Object> popularProducts() {
        Map<String, Object> map = new LinkedHashMap<>();
        try{

            Map<ProductDTO, Integer> countProducts = prodsCounter();

            if (countProducts.isEmpty()) {
                map.put(API.GEN_MSG, API.GEN_NOT_FOUNDS);
            }

            // Sort the map based on the count of products in descending order
            List<Map.Entry<ProductDTO, Integer>> sortedEntries = prodsSorter(countProducts);

            if (sortedEntries.isEmpty()) {
                map.put(API.GEN_MSG, API.GEN_NOT_FOUNDS);
            }

            // Convert the sorted counts into ProductCountResponse objects
            List<ProductCountResponse> prodsToSend = prodsSortedConverter(sortedEntries);

            if (!prodsToSend.isEmpty()) {
                map.put(API.GEN_MSG, API.GEN_FOUNDS);
                map.put(API.GEN_DATA, prodsToSend);
            } else {
                map.put(API.GEN_MSG, API.GEN_NOT_FOUNDS);
            }
            return map;
        }catch(Exception e) {
            map.put(API.GEN_MSG, e.getCause().getMessage());
            return map;
        }
    }

    /**
     * Counts the occurrences of each product in the purchase history.
     * @return A map containing the products and their counts.
     */
    private Map<ProductDTO, Integer> prodsCounter(){
        return repository.findAll()
                .stream()
                .flatMap(PurchaseHistory -> PurchaseHistory.getProductDetailList()
                        .stream())
                .map(productDetailConverter::toDTO)
                .collect(
                        HashMap::new,
                        (m, p) -> m.merge(
                                p.getProductDTO(), 1, Integer::sum
                        ),
                        HashMap::putAll);
    }

    /**
     * Sorts the products based on their counts.
     * @param prods The map containing products and their counts.
     * @return A list of sorted product entries.
     */
    private List<Map.Entry<ProductDTO, Integer>> prodsSorter(Map<ProductDTO, Integer> prods){
        return prods.entrySet()
                .stream()
                .sorted(Map.Entry.<ProductDTO, Integer>comparingByValue().reversed())
                .limit(20)
                .toList();
    }

    /**
     * Converts the sorted product counts into ProductCountResponse objects.
     * @param prods The list of sorted product entries.
     * @return A list of ProductCountResponse objects.
     */
    private List<ProductCountResponse> prodsSortedConverter(List<Map.Entry<ProductDTO, Integer>> prods){
        return prods.stream()
                .map(entry -> new ProductCountResponse(
                        entry.getKey(),
                        entry.getValue()))
                .toList();
    }

    /**
     * Retrieves all purchase history entries for a given user ID.
     * @param id The user ID.
     * @return A map containing the list of purchase history entries and a message.
     */
    public Map<String, Object> getAllByUserId(Long id){
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            List<PurchaseHistoryDTO> allProds = repository.findAll()
                    .stream()
                    .map(converter::toDTO)
                    .filter(PurchaseHistory -> id.equals(PurchaseHistory.getAnagraphicDTO().getId()))
                    .toList();

            if (!allProds.isEmpty()) {
                map.put(API.GEN_MSG, API.GEN_FOUNDS);
                map.put(API.GEN_DATA, allProds);
            } else {
                map.put(API.GEN_MSG, API.GEN_NOT_FOUNDS);
            }
            return map;
        } catch (Exception e) {
            map.put(API.GEN_MSG, e.getCause().getMessage());
            return map;
        }
    }

    /**
     * Creates a new purchase history entry.
     * @param dto The purchase history DTO.
     * @return A map containing the result of the operation and a message.
     */
    @Override
    public Map<String, Object> create(PurchaseHistoryDTO dto) {
        Map<String, Object> map = new LinkedHashMap<>();
        String response = productDetailService.updateQuantity(dto.getProductDetailDTOList());

        if(!response.equals(API.COL_PROD_SUCCESS)){
            map.put(API.GEN_MSG, response);
            return map;
        }

        try {
            PurchaseHistory savedEntity = repository.save(converter.toEntity(dto));
            PurchaseHistoryDTO savedDto = converter.toDTO(savedEntity);

            map.put(API.GEN_MSG, API.HIST_CREATE_SUCCESS);
            map.put(API.GEN_DATA, savedDto);

            return map;
        } catch (Exception e) {
            map.put(API.GEN_MSG, e.getCause().getMessage());
            return map;
        }
    }
}


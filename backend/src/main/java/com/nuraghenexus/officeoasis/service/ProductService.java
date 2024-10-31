package com.nuraghenexus.officeoasis.service;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.converter.ProductConverter;
import com.nuraghenexus.officeoasis.dto.ProductDTO;
import com.nuraghenexus.officeoasis.dto.utils.SearchRequest;
import com.nuraghenexus.officeoasis.model.Product;
import com.nuraghenexus.officeoasis.model.enumerations.Categories;
import com.nuraghenexus.officeoasis.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

/**
 * This service class provides functionality related to products.
 */
@Service
public class ProductService extends AbstractService<Product, ProductDTO>{

    @Autowired
    private ProductRepository repository;

    @Autowired
    private ProductConverter converter;

    /**
     * Retrieves a list of the newest products.
     * @return A list of the newest products.
     */
    public Map<String, Object> newProducts(){
        Map<String, Object> map = new LinkedHashMap<>();
        try{
            List<ProductDTO> foundProds = converter.toDTOList(
                    repository.findFirst10ByOrderByIdDesc());

            if(foundProds.isEmpty()){
                map.put(API.GEN_MSG, API.GEN_NOT_FOUNDS);
                return map;
            }
            map.put(API.GEN_DATA, foundProds);
            map.put(API.GEN_MSG, API.GEN_FOUNDS);
        }catch (Exception ex){
            map.put(API.GEN_MSG, ex.getCause().getMessage());
        }
        return map;
    }

    /**
     * Filters products by categories.
     * @param categories The categories by which to filter the products.
     * @return A map containing the filtered products and a message.
     */
    public Map<String, Object> filterByCategory(Categories categories){
        Map<String, Object> map = new LinkedHashMap<>();
        try{
            List<ProductDTO> foundProds = repository.findAll().stream()
                    .map(converter::toDTO)
                    .filter(cat -> cat.getCategory().equals(categories))
                    .toList();

            if(foundProds.isEmpty()){
                map.put(API.GEN_MSG, API.PROD_IS_EMPTY);
                return map;
            }
            map.put(API.GEN_DATA, foundProds);
            map.put(API.GEN_MSG, API.PROD_SUCCESS_FILT_CATEG);
        }catch (Exception ex){
            map.put(API.GEN_MSG, ex.getCause().getMessage());
        }
        return map;
    }

    /**
     * Updates the average rating of a product.
     * @param product The product to update.
     * @param rating The new average rating.
     */
    public void updateAverageRating(Product product,double rating){
        ProductDTO productDTO= new ProductDTO(product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getCategory(),
                product.getDiscount(),
                rating);
        this.update(productDTO);
    }

    /**
     * Searches for products based on the given search criteria.
     * @param search The search criteria.
     * @return A map containing the search results.
     */
    public Map<String, Object> search(SearchRequest search){
        return switch (search.getOrderBy()) {
            case NULL ->
                    searchProducts(search, Comparator.comparing(ProductDTO::getName), true);
            case REVIEW ->
                    searchProducts(search, Comparator.comparing(ProductDTO::getAverageRating).reversed(), false);
            case RISING_PRICE ->
                    searchProducts(search, Comparator.comparing(ProductDTO::getPrice).reversed(), false);
            case FALLING_PRICE ->
                    searchProducts(search, Comparator.comparing(ProductDTO::getPrice), false);
            case LATEST ->
                    searchProducts(search, Comparator.comparing(ProductDTO::getId).reversed(), false);
        };
    }

    /**
     * Searches for products based on the given search criteria and sorting comparator.
     * @param search The search criteria.
     * @param comparator The sorting comparator.
     * @return A map containing the search results.
     */
    private Map<String, Object> searchProducts(SearchRequest search, Comparator<ProductDTO> comparator, boolean isDefault) {
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            List<ProductDTO> foundProds = repository.findAll()
                    .stream()
                    .map(converter::toDTO)
                    .filter(product ->
                            checkDefaultOrOther(search, product, isDefault)
                    )
                    .sorted(comparator)
                    .collect(Collectors.toList());

            if (foundProds.isEmpty()) {
                map.put(API.GEN_MSG, API.PROD_IS_EMPTY);
                return map;
            }
            map.put(API.GEN_DATA, foundProds);
            map.put(API.GEN_MSG, API.GEN_FOUNDS);
            return map;
        } catch (Exception ex) {
            map.put(API.GEN_MSG, ex.getCause().getMessage());
        }
        return map;
    }

    private boolean checkDefaultOrOther(SearchRequest search, ProductDTO product, boolean isDefault){
        if(isDefault){
            if(search.getCategory() != Categories.OTHER){
                return notOTHERCategory(search, product);
            }
            return product.getName().toLowerCase().contains(
                    search.getName().toLowerCase()
            );
        }else{
            return notOTHERCategory(search, product);
        }
    }

    private boolean notOTHERCategory(SearchRequest search, ProductDTO product){
       return search.getCategory().equals(
                    product.getCategory()) &&
                    product.getName().toLowerCase().contains(
                            search.getName().toLowerCase());

    }

/*
    public List<ProductDTO> search(SearchRequest search){
        return switch (search.getOrderBy()) {
            case REVIEW -> repository.findAll().stream().map(converter::toDTO)
                    .filter(Product ->
                            search.getCategory().equals(Product.getCategory()) &&
                                    Product.getName().toLowerCase().contains(search.getName().toLowerCase()))
                    .sorted(Comparator.comparing(ProductDTO::getAverageRating).reversed())
                    .collect(Collectors.toList());

            case RISING_PRICE -> repository.findAll().stream().map(converter::toDTO)
                    .filter(Product ->
                            search.getCategory().equals(Product.getCategory()) &&
                                    Product.getName().toLowerCase().contains(search.getName().toLowerCase()))
                    .sorted(Comparator.comparing(ProductDTO::getPrice).reversed())
                    .collect(Collectors.toList());

            case FALLING_PRICE -> repository.findAll().stream().map(converter::toDTO)
                    .filter(Product ->
                            search.getCategory().equals(Product.getCategory()) &&
                                    Product.getName().toLowerCase().contains(search.getName().toLowerCase()))
                    .sorted(Comparator.comparing(ProductDTO::getPrice))
                    .collect(Collectors.toList());

            case LATEST -> repository.findAll().stream().map(converter::toDTO)
                    .filter(Product ->
                            search.getCategory().equals(
                                    Product.getCategory()) &&
                                    Product.getName().toLowerCase().contains(search.getName().toLowerCase()))
                    .sorted(Comparator.comparing(ProductDTO::getId).reversed())
                    .collect(Collectors.toList());

            default -> repository.findAll().stream().map(converter::toDTO)
                    .filter(Product ->
                            Product.getName()
                                    .toLowerCase()
                                    .contains(
                                            search.getName().toLowerCase()))
                    .sorted(Comparator.comparing(ProductDTO::getName))
                    .collect(Collectors.toList());
        };
    }
*/
}
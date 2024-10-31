package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.dto.ProductDTO;
import com.nuraghenexus.officeoasis.dto.utils.SearchRequest;
import com.nuraghenexus.officeoasis.model.enumerations.Categories;
import com.nuraghenexus.officeoasis.service.ProductService;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;
import java.util.Map;

/**
 * This controller class handles requests related to products.
 */
@RestController
@RequestMapping(API.PROD_REQ_MAP)
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
public class ProductController extends AbstractController<ProductDTO>{

    @Autowired
    private ProductService service;

    /**
     * Retrieves a list of the newest products.
     * @return A list of the newest products.
     */
    @GetMapping(API.PROD_NEW)
    public ResponseEntity<Map<String, Object>> newProducts(){
        return  ResponseUtilController.handleGenericResponse(
                service.newProducts(),
                API.GEN_FOUNDS);
    }

    /**
     * Searches for products based on the provided search criteria.
     * @param search The search criteria.
     * @return A list of products matching the search criteria.
     */
    @PostMapping(API.PROD_SEARCH)
    public ResponseEntity<Map<String, Object>> search(@RequestBody SearchRequest search){
        return ResponseUtilController.handleGenericResponse(
                service.search(search),
                API.GEN_FOUNDS);
    }

    /**
     * Filters products by categories.
     * @param categories The categories by which to filter the products.
     * @return A response entity containing the filtered products and a message.
     */
    @GetMapping(API.PROD_BY_CATEGORY)
    public ResponseEntity<Map<String, Object>> filterByCategory(@RequestParam Categories categories){
        return ResponseUtilController.handleGenericResponse(
                service.filterByCategory(categories),
                API.PROD_SUCCESS_FILT_CATEG);
    }
}

//get all
// filt categ - enrico

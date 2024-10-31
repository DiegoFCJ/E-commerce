package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.dto.ProductDetailDTO;
import com.nuraghenexus.officeoasis.service.ProductDetailService;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;
import java.util.Map;

/**
 * Controller class for handling color product-related requests.
 */
@RestController
@RequestMapping(API.COL_PROD_REQ_MAP)
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
public class ProductDetailController extends AbstractController<ProductDetailDTO>{

    @Autowired
    private ProductDetailService productDetailService;

    /**
     * Retrieves the details of a color product based on the provided ID.
     * @param id The ID of the color product to retrieve details for.
     * @return ResponseEntity containing a map with the details of the color product.
     */
    @GetMapping(value = API.COL_PROD_DET)
    public ResponseEntity<Map<String, Object>> detailProduct(@RequestParam Long id) {
        return ResponseUtilController.handleGenericResponse(
                productDetailService.detailProduct(id),
                API.GEN_FOUND);
    }
}

//da vedere caso per caso
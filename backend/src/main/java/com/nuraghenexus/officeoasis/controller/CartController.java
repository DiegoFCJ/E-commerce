package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.dto.*;
import com.nuraghenexus.officeoasis.service.CartService;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;

import java.util.Map;

/**
 * CartController is a controller class responsible for handling cart-related HTTP requests.
 */
@RestController
@RequestMapping(API.CART_REQ_MAP)
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
public class CartController extends AbstractController<CartDTO>{

    @Autowired
    private CartService service;

    /**
     * Retrieves the count of items in the cart.
     *
     * @return ResponseEntity containing a map with the result of the operation and HTTP status.
     */
    @GetMapping(API.CART_COUNT)
    public ResponseEntity<Map<String, Object>> countCart(){
        return ResponseUtilController.handleGenericResponse(
                service.countCart(),
                API.CART_COUNT_SUCCESS);
    }

    /**
     * Retrieves cart data by user ID.
     *
     * @param id The ID of the user.
     * @return ResponseEntity containing a map with the result of the operation and HTTP status.
     */
    @GetMapping(API.READ_BY_UID)
    public ResponseEntity<Map<String, Object>> readByUserId(@RequestParam Long id) {
        return ResponseUtilController.handleGenericResponse(
                service.readByUserId(id),
                API.GEN_FOUND);
    }
}

// create gestire una sola volta
// read normale  levare
// get all
// delete se viene eliminato profilo
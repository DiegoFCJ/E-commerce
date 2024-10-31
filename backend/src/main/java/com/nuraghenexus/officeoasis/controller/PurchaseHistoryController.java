package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.dto.*;
import com.nuraghenexus.officeoasis.service.PurchaseHistoryService;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;

import java.util.Map;

/**
 * This controller class handles HTTP requests related to purchase history.
 */
@RestController
@RequestMapping(API.HIST_REQ_MAP)
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
public class PurchaseHistoryController extends AbstractController<PurchaseHistoryDTO>{

    @Autowired
    private PurchaseHistoryService service;

    /**
     * Retrieves a list of popular products based on purchase history.
     * @return A ResponseEntity containing the list of popular products and a success message.
     */
    @GetMapping(API.HIST_POPULAR_PRODS)
    public ResponseEntity<Map<String, Object>> popularProducts(){
        return ResponseUtilController.handleGenericResponse(
                service.popularProducts(),
                API.GEN_FOUNDS);
    }

    /**
     * Retrieves all purchase history entries for a given user ID.
     * @param id The user ID.
     * @return A ResponseEntity containing the list of purchase history entries and a success message.
     */
    @GetMapping(API.HIST_ALL_BY_UID)
    public ResponseEntity<Map<String, Object>> getAllByUserId(@RequestParam Long id){
        return ResponseUtilController.handleGenericResponse(
                service.getAllByUserId(id),
                API.GEN_FOUNDS);
    }

    @Override
    @PostMapping(API.CREATE)
    public ResponseEntity<Map<String, Object>> create(@RequestBody PurchaseHistoryDTO purchaseHistoryDTO) {
        return ResponseUtilController.handleGenericResponse(
                service.create(purchaseHistoryDTO),
                API.HIST_CREATE_SUCCESS);
    }
}


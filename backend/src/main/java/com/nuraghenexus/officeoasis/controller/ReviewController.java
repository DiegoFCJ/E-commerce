package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.dto.*;
import com.nuraghenexus.officeoasis.service.ReviewService;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;
import java.util.Map;

@RestController
@RequestMapping(API.REV_REQ_MAP)
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
public class ReviewController extends AbstractController<ReviewDTO>{

    @Autowired
    private ReviewService service;
    @GetMapping(API.REV_GET_ALL_BY_PID)
    public ResponseEntity<Map<String, Object>> findAllByProductId(@RequestParam Long id){
        return ResponseUtilController.handleGenericResponse(
                service.getAllByProductId(id),
                API.GEN_FOUNDS);
    }

    @Override
    @PostMapping(API.CREATE)
    public ResponseEntity<Map<String, Object>> create(@RequestBody ReviewDTO reviewDTO) {
        return ResponseUtilController.handleGenericResponse(
                service.create(reviewDTO),
                API.REV_CREATE_SUCCESS);
    }

}

//read
//getall
//delete
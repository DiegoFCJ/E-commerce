package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.dto.AnagraphicDTO;
import com.nuraghenexus.officeoasis.service.AnagraphicService;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;
import java.util.Map;

/**
 * AnagraphicController is a controller class responsible for handling anagraphic-related HTTP requests.
 */
@RestController
@RequestMapping(API.ANAG_REQ_MAP)
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
public class AnagraphicController extends AbstractController<AnagraphicDTO>{

    @Autowired
    private AnagraphicService anagraphicService;

    /**
     * Finds anagraphic data by user ID.
     *
     * @param userId The ID of the user.
     * @return ResponseEntity containing a map with the result of the operation and HTTP status.
     */
    @GetMapping(value = API.READ_BY_UID)
    public ResponseEntity<Map<String, Object>> readByUserId(@RequestParam(API.ANAG_USERID) Long userId) {
        return ResponseUtilController.handleGenericResponse(
                anagraphicService.readByUserId(userId),
                API.GEN_FOUND);
    }
}
// get all
// delete da chiedere al tizio per le ricevute
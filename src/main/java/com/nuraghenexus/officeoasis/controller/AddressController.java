package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;
import com.nuraghenexus.officeoasis.dto.AddressDTO;
import com.nuraghenexus.officeoasis.service.AddressService;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller class for handling address-related requests.
 */
@RestController
@RequestMapping(API.ADDR_REQ_MAP)
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
public class AddressController extends AbstractController<AddressDTO> {

    @Autowired
    private AddressService addressService;

    @GetMapping(value = API.ADDR_GET_ALL_BY_ANAGR)
    public ResponseEntity<Map<String, Object>> getAllByAnagraphicId(@RequestParam(API.ADDR_ANAGRAPhIC_ID) Long anagraphicId) {
        return ResponseUtilController.handleGenericResponse(
                addressService.getAllByAnagraphicId(anagraphicId),
                API.GEN_FOUNDS);
    }

}

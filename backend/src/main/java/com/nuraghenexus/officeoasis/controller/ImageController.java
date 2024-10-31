package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.dto.utils.CreateImageRequest;
import com.nuraghenexus.officeoasis.service.ImageService;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;

import java.io.IOException;
import java.util.Map;


/**
 * Controller class for handling image related requests.
 */
@RestController
@RequestMapping(API.IMG_REQ_MAP)
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
public class ImageController{

    @Autowired
    private ImageService imageService;

    @PostMapping(API.IMG_CREATE)
    public ResponseEntity<Map<String, Object>> create(@RequestBody CreateImageRequest imageRequest) throws IOException {
        return ResponseUtilController.handleGenericResponse(
                imageService.create(imageRequest),
                API.IMG_CREATE_SUCCESS);
    }

    /**
     * Endpoint for reading an image from the file system.
     * @param id The ID of the image to be read.
     * @return ResponseEntity containing the image data.
     * @throws IOException If an I/O exception occurs while reading the image.
     */
    @GetMapping(API.IMG_FILE_SYSTEM)
    public ResponseEntity<Map<String, Object>> read(@RequestParam Long id) throws IOException {
        return ResponseUtilController.handleGenericResponse(imageService.read(id), API.IMG_CREATE_SUCCESS);
        /*
        byte[] imageData = (byte[]) imageService.read(id).get(API.GEN_DATA);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(API.IMG_VALUE_OF))
                .body(imageData);
        */
    }
}
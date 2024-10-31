package com.nuraghenexus.officeoasis.service;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.converter.ProductConverter;
import com.nuraghenexus.officeoasis.dto.utils.CreateImageRequest;
import com.nuraghenexus.officeoasis.model.Image;
import com.nuraghenexus.officeoasis.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository repository;

    @Autowired
    private ProductConverter productConverter;

    public Map<String, Object> create(CreateImageRequest imageRequest) throws IOException {
        Map<String, Object> map = new LinkedHashMap<>();

        byte[] fileBytes = Base64.getDecoder().decode((String) imageRequest.getFile().get("file"));
        String originalFilename = (String) imageRequest.getFile().get("originalFilename");
        String contentType = (String) imageRequest.getFile().get("contentType");

        InputStream inputStream = new ByteArrayInputStream(fileBytes);
        MultipartFile file = new MockMultipartFile(originalFilename, originalFilename, contentType, inputStream);

        String builtFilePath = API.IMG_FOLDER_PATH + API.IMG_TYPE_PROFILE + file.getOriginalFilename();

        Image image = repository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(builtFilePath).build());

        file.transferTo(new File(builtFilePath));

        if (repository.findById(image.getId()).isPresent()) {
            map.put(API.GEN_MSG, API.IMG_CREATE_SUCCESS);
            map.put(API.GEN_DATA, image);
            return map;
        }
        map.put(API.GEN_MSG, API.IMG_CREATE_ERR);
        return map;
    }

    /**
     * Reads an image from the file system based on the provided ID.
     * @param id The ID of the image to be read.
     * @return A map containing the image data.
     * @throws IOException If an I/O exception occurs while reading the image.
     */
    public Map<String, Object> read(Long id) throws IOException {
        Map<String, Object> map = new LinkedHashMap<>();
        Optional<Image> fileData = repository.findById(id);
        if (fileData.isPresent()) {
            String filePath = fileData.get().getFilePath();
            map.put(API.GEN_MSG, API.IMG_CREATE_SUCCESS);
            map.put(API.GEN_DATA, Files.readAllBytes(new File(filePath).toPath()));
        } else {
            map.put(API.GEN_MSG, API.IMG_CREATE_ERR);
        }
        return map;
    }
}
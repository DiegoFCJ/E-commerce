package com.nuraghenexus.officeoasis.converter;

import com.nuraghenexus.officeoasis.dto.ImageDTO;
import com.nuraghenexus.officeoasis.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This component class converts Image objects to ImageDTO objects and vice versa.
 */
@Component
public class ImageConverter {

    @Autowired
    private AnagraphicConverter anagraphicConverter;
    @Autowired
    private ProductConverter productConverter;
    /**
     * Converts an ImageDTO object to an Image object.
     *
     * @param imageDTO The ImageDTO object to be converted.
     * @return An Image object.
     */
    public Image toEntity(ImageDTO imageDTO) {
        Image image = null;
        if (imageDTO != null) {
            image = new Image(
                    imageDTO.getId(),
                    imageDTO.getName(),
                    imageDTO.getType(),
                    imageDTO.getFilePath(),
                    anagraphicConverter.toEntity(imageDTO.getAnagraphicDTO()),
                    productConverter.toEntity(imageDTO.getProductDTO())
            );
        }
        return image;
    }

    /**
     * Converts an Image object to an ImageDTO object.
     *
     * @param image The Image object to be converted.
     * @return An ImageDTO object.
     */
    public ImageDTO toDTO(Image image) {
        ImageDTO imageDTO = null;
        if(image != null){
            imageDTO = new ImageDTO(
                    image.getId(),
                    image.getName(),
                    image.getType(),
                    image.getFilePath(),
                    anagraphicConverter.toDTO(image.getAnagraphic()),
                    productConverter.toDTO(image.getProduct())
            );
        }
        return imageDTO;
    }
}

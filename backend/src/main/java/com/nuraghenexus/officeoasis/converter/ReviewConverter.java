package com.nuraghenexus.officeoasis.converter;

import com.nuraghenexus.officeoasis.dto.ReviewDTO;
import com.nuraghenexus.officeoasis.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This component class converts Review objects to ReviewDTO objects and vice versa.
 */
@Component
public class ReviewConverter extends AbstractConverter<Review, ReviewDTO>{

    @Autowired
    private ProductConverter productConverter;
    @Autowired
    private AnagraphicConverter anagraphicConverter;

    /**
     * Converts a ReviewDTO object to a Review object.
     *
     * @param reviewDTO The ReviewDTO object to be converted.
     * @return A Review object.
     */
    @Override
    public Review toEntity(ReviewDTO reviewDTO) {
        Review review = null;
        if (reviewDTO != null) {
            review = new Review(
                    reviewDTO.getId(),
                    reviewDTO.getTitle(),
                    reviewDTO.getDescription(),
                    reviewDTO.getRating(),
                    anagraphicConverter.toEntity(reviewDTO.getAnagraphicDTO()),
                    productConverter.toEntity(reviewDTO.getProductDTO())
            );
        }
        return review;
    }

    /**
     * Converts a Review object to a ReviewDTO object.
     *
     * @param review The Review object to be converted.
     * @return A ReviewDTO object.
     */

    @Override
    public ReviewDTO toDTO(Review review) {
        ReviewDTO reviewDTO = null;
        if(review != null){
            reviewDTO = new ReviewDTO(
                    review.getId(),
                    review.getTitle(),
                    review.getDescription(),
                    review.getRating(),
                    anagraphicConverter.toDTO(review.getAnagraphic()),
                    productConverter.toDTO(review.getProduct())
            );
        }
        return reviewDTO;
    }
}

package com.nuraghenexus.officeoasis.service;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.converter.ProductConverter;
import com.nuraghenexus.officeoasis.converter.ReviewConverter;
import com.nuraghenexus.officeoasis.dto.ReviewDTO;
import com.nuraghenexus.officeoasis.model.Product;
import com.nuraghenexus.officeoasis.model.Review;
import com.nuraghenexus.officeoasis.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReviewService extends AbstractService<Review, ReviewDTO>{

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductService ProductService;

    @Autowired
    private ReviewConverter reviewConverter;

    @Autowired
    private ProductConverter ProductConverter;

    public Map<String, Object> getAllByProductId(Long id){
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            List<ReviewDTO> allProds = reviewRepository.findAll()
                    .stream()
                    .map(reviewConverter::toDTO)
                    .filter(review -> id.equals(review.getProductDTO().getId()))
                    .toList();

            if (!allProds.isEmpty()) {
                map.put(API.GEN_MSG, API.GEN_FOUNDS);
                map.put(API.GEN_DATA, allProds);
            } else {
                map.put(API.GEN_MSG, API.GEN_NOT_FOUNDS);
            }
            return map;
        } catch (Exception e) {
            map.put(API.GEN_MSG, e.getCause().getMessage());
            return map;
        }
    }

    @Override
    public Map<String, Object> create(ReviewDTO dto) {
        Map<String, Object> map = new LinkedHashMap<>();

        try {
            Review savedEntity = reviewRepository.save(reviewConverter.toEntity(dto));

            if(savedEntity.getId() == null || savedEntity.getId() == 0){
                map.put(API.GEN_MSG, API.REV_CREATE_ERROR);
                return map;
            }

            ReviewDTO savedDto = reviewConverter.toDTO(savedEntity);

            updateAverageRating(ProductConverter.toEntity(dto.getProductDTO()));

            map.put(API.GEN_MSG, API.REV_CREATE_SUCCESS);
            map.put(API.GEN_DATA, savedDto);

            return map;
        } catch (Exception e) {
            map.put(API.GEN_MSG, e.getCause().getMessage());
            return map;
        }
    }

    private void updateAverageRating(Product Product){
        ProductService.updateAverageRating( Product,
                reviewRepository.findAll().stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0));
    }

}

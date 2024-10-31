package com.nuraghenexus.officeoasis.repository;

import com.nuraghenexus.officeoasis.model.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@Transactional
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> readAllByProductId(Long id);
}

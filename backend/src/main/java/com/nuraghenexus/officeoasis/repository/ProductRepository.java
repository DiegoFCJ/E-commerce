package com.nuraghenexus.officeoasis.repository;

import com.nuraghenexus.officeoasis.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

import java.util.List;


@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findFirst10ByOrderByIdDesc();
}

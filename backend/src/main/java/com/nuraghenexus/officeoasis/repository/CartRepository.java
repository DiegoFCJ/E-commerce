package com.nuraghenexus.officeoasis.repository;

import com.nuraghenexus.officeoasis.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;


@Repository
@Transactional
public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart readByUserId(Long id);
}

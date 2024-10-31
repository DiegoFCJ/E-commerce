package com.nuraghenexus.officeoasis.repository;

import com.nuraghenexus.officeoasis.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;


@Repository
@Transactional
public interface AddressRepository extends JpaRepository<Address, Long> {

}

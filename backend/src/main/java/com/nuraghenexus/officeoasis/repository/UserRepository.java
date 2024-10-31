package com.nuraghenexus.officeoasis.repository;

import jakarta.transaction.Transactional;
import com.nuraghenexus.officeoasis.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	Optional<User> findByUsername(String username);

}

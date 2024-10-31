package com.nuraghenexus.officeoasis.repository;

import com.nuraghenexus.officeoasis.model.VerificationToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface VTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
    List<VerificationToken> findByUserId(Long userId);
}

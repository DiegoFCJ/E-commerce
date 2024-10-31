package com.nuraghenexus.officeoasis.repository;

import com.nuraghenexus.officeoasis.model.Anagraphic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface AnagraphicRepository extends JpaRepository<Anagraphic, Long> {

    @Modifying
    @Query("UPDATE Anagraphic SET name = :name, surname = :surname, gender = :gender, nationality = :nationality, birthDate = :birthDate WHERE user.id = :userId")
    void updateByUserId(
            @Param("userId") Long userId,
            @Param("name") String name,
            @Param("surname") String surname,
            @Param("gender") String gender,
            @Param("nationality") String nationality,
            @Param("birthDate") String birthDate
    );

}

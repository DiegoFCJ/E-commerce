package com.nuraghenexus.officeoasis.service;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.converter.AnagraphicConverter;
import com.nuraghenexus.officeoasis.repository.AnagraphicRepository;
import com.nuraghenexus.officeoasis.dto.AnagraphicDTO;
import com.nuraghenexus.officeoasis.model.Anagraphic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

/**
 * AnagraphicService is a service class responsible for handling anagraphic-related operations.
 */
@Service
public class AnagraphicService extends AbstractService<Anagraphic, AnagraphicDTO>{

    @Autowired
    private AnagraphicConverter converter;

    @Autowired
    private AnagraphicRepository repository;

    /**
     * Finds anagraphic data by user ID.
     *
     * @param userId The ID of the user.
     * @return A map containing the result of the operation, including the found anagraphic data if present.
     */
    public Map<String, Object> readByUserId(Long userId) {
        Map<String, Object> map = new LinkedHashMap<>();
            Optional<Anagraphic> anagraphicOptional = repository.findAll().stream()
                    .filter(anagraphic -> anagraphic.getUser().getId().equals(userId))
                    .findFirst();
            if (anagraphicOptional.isPresent()) {
                AnagraphicDTO anagraphicDTO = converter.toDTO(anagraphicOptional.get());
                map.put(API.GEN_MSG, API.GEN_FOUND);
                map.put(API.GEN_DATA, anagraphicDTO);
            } else {
                map.put(API.GEN_MSG, API.GEN_NOT_FOUND);
            }
            return map;
    }


    @Override
    public String update(AnagraphicDTO dto) {
        System.out.println("entra");
        String response;

        if (dto.getUserDTO() != null && dto.getUserDTO().getId() != null) {
            Long userId = dto.getUserDTO().getId();

            if (userId != null) {
                repository.updateByUserId(
                        userId,
                        dto.getName(),
                        dto.getSurname(),
                        dto.getGender(),
                        dto.getNationality(),
                        dto.getBirthDate()
                );

                response = "Update eseguito con successo per l'utente con ID: " + userId;
            } else {
                response = "ID utente non valido per l'aggiornamento";
            }
        } else {
            response = "ID utente non presente nell'oggetto DTO";
        }

        System.out.println(response);
        return response;
    }


}

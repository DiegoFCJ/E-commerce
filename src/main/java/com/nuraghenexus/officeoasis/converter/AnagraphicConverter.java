package com.nuraghenexus.officeoasis.converter;

import com.nuraghenexus.officeoasis.dto.AnagraphicDTO;
import com.nuraghenexus.officeoasis.model.Anagraphic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This component class converts Anagraphic objects to AnagraphicDTO objects and vice versa.
 */
@Component
public class AnagraphicConverter extends AbstractConverter<Anagraphic, AnagraphicDTO>{

    @Autowired
    private UserConverter userConverter;

    /**
     * Converts an AnagraphicDTO object to an Anagraphic object.
     *
     * @param anagraphicDTO The AnagraphicDTO object to be converted.
     * @return An Anagraphic object.
     */
    @Override
    public Anagraphic toEntity(AnagraphicDTO anagraphicDTO) {
        Anagraphic anagraphic = null;
        if (anagraphicDTO != null) {
            anagraphic = new Anagraphic(
                    anagraphicDTO.getId(),
                    anagraphicDTO.getName(),
                    anagraphicDTO.getSurname(),
                    anagraphicDTO.getGender(),
                    anagraphicDTO.getNationality(),
                    anagraphicDTO.getBirthDate(),
                    userConverter.toEntity(anagraphicDTO.getUserDTO())
            );
        }
        return anagraphic;
    }

    /**
     * Converts an Anagraphic object to an AnagraphicDTO object.
     *
     * @param anagraphic The Anagraphic object to be converted.
     * @return An AnagraphicDTO object.
     */
    @Override
    public AnagraphicDTO toDTO(Anagraphic anagraphic) {
        AnagraphicDTO anagraphicDTO = null;
        if(anagraphic != null){
            anagraphicDTO = new AnagraphicDTO(
                    anagraphic.getId(),
                    anagraphic.getName(),
                    anagraphic.getSurname(),
                    anagraphic.getGender(),
                    anagraphic.getNationality(),
                    anagraphic.getBirthDate(),
                    userConverter.toDTO(anagraphic.getUser())
            );
        }
        return anagraphicDTO;
    }
}

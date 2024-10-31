package com.nuraghenexus.officeoasis.service;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.dto.ProductDTO;
import com.nuraghenexus.officeoasis.model.Address;
import com.nuraghenexus.officeoasis.dto.AddressDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AddressService extends AbstractService<Address, AddressDTO>{


    public Map<String, Object> getAllByAnagraphicId(Long userId){
        Map<String, Object> map = new LinkedHashMap<>();
        try {
            List<AddressDTO> foundAddress = repository.findAll()
                    .stream()
                    .map(converter::toDTO)
                    .filter(Address ->
                            Address.getAnagraphicDTO().getId().equals(userId)
                    )
                    .toList();

            if (foundAddress.isEmpty()) {
                map.put(API.GEN_MSG, API.ADDR_IS_EMPTY);
                return map;
            }
            map.put(API.GEN_DATA, foundAddress);
            map.put(API.GEN_MSG, API.GEN_FOUNDS);
            return map;
        } catch (Exception ex) {
            map.put(API.GEN_MSG, ex.getCause().getMessage());
        }
        return map;
    }
}


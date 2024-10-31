package com.nuraghenexus.officeoasis.converter;

import com.nuraghenexus.officeoasis.model.Address;
import com.nuraghenexus.officeoasis.dto.AddressDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This component class converts Address objects to AddressDTO objects and vice versa.
 */
@Component
public class AddressConverter extends AbstractConverter<Address, AddressDTO>{

    @Autowired
    private AnagraphicConverter anagraphicConverter;

    /**
     * Converts an AddressDTO object to an Address object.
     *
     * @param addressDTO The AddressDTO object to be converted.
     * @return An Address object.
     */
    @Override
    public Address toEntity(AddressDTO addressDTO) {
        Address address = null;
        if (addressDTO != null) {
            address = new Address(
                    addressDTO.getId(),
                    addressDTO.getNationality(),
                    addressDTO.getName(),
                    addressDTO.getSurname(),
                    addressDTO.getAddress(),
                    addressDTO.getResidenceCity(),
                    addressDTO.getProvince(),
                    addressDTO.getCap(),
                    addressDTO.getNumber(),
                    anagraphicConverter.toEntity(addressDTO.getAnagraphicDTO())
            );
        }
        return address;
    }

    /**
     * Converts an Address object to an AddressDTO object.
     *
     * @param address The Address object to be converted.
     * @return An AddressDTO object.
     */
    @Override
    public AddressDTO toDTO(Address address) {
        AddressDTO addressDTO = null;
        if(address != null){
            addressDTO = new AddressDTO(
                    address.getId(),
                    address.getNationality(),
                    address.getName(),
                    address.getSurname(),
                    address.getAddress(),
                    address.getResidenceCity(),
                    address.getProvince(),
                    address.getCap(),
                    address.getNumber(),
                    anagraphicConverter.toDTO(address.getAnagraphic())
            );
        }
        return addressDTO;
    }
}

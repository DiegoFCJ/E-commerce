package com.nuraghenexus.officeoasis.converter;

import java.util.ArrayList;
import java.util.List;

/**
 * This abstract class provides generic methods for converting between entity and DTO objects.
 *
 * @param <Entity> The entity type.
 * @param <DTO> The DTO type.
 */
public abstract class AbstractConverter<Entity,DTO> implements Converter<Entity,DTO> {

	/**
	 * Converts a list of DTO objects to a list of entity objects.
	 *
	 * @param listDTO The list of DTO objects to be converted.
	 * @return A list of entity objects.
	 */
	public List<Entity> toEntityList (Iterable<DTO> listDTO) {
		List<Entity> list = new ArrayList<Entity>();

		if(listDTO != null) {
			for (DTO dto:listDTO) {
				Entity entity = toEntity(dto);
				list.add(entity);
			}
		}
		return list;
	}

	/**
	 * Converts a list of entity objects to a list of DTO objects.
	 *
	 * @param listEntity The list of entity objects to be converted.
	 * @return A list of DTO objects.
	 */
	public List<DTO> toDTOList (Iterable<Entity> listEntity) {
		List<DTO> list = new ArrayList<DTO>();

		if(listEntity != null) {
			for (Entity entity:listEntity) {
				DTO dto = toDTO(entity);
				list.add(dto);
			}
		}
		return list;
	}
}

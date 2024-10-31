package com.nuraghenexus.officeoasis.converter;

import java.util.List;

/**
 * This interface defines methods for converting between entity and DTO objects.
 *
 * @param <Entity> The entity type.
 * @param <DTO> The DTO type.
 */
public interface Converter<Entity, DTO> {

	/**
	 * Converts a DTO object to an entity object.
	 *
	 * @param dto The DTO object to be converted.
	 * @return An entity object.
	 */
	public Entity toEntity(DTO dto);

	/**
	 * Converts an entity object to a DTO object.
	 *
	 * @param entity The entity object to be converted.
	 * @return A DTO object.
	 */
	public DTO toDTO(Entity entity);

	/**
	 * Converts a list of entity objects to a list of DTO objects.
	 *
	 * @param entityList The list of entity objects to be converted.
	 * @return A list of DTO objects.
	 */
	public List<DTO> toDTOList(Iterable<Entity> entityList);

	/**
	 * Converts a list of DTO objects to a list of entity objects.
	 *
	 * @param dtoList The list of DTO objects to be converted.
	 * @return A list of entity objects.
	 */
	public List<Entity> toEntityList(Iterable<DTO> dtoList);

}

package com.nuraghenexus.officeoasis.service;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.converter.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

public abstract class AbstractService<Entity, DTO> implements ServiceDTO<DTO> {

	@Autowired
	protected JpaRepository<Entity, Long> repository;

	@Autowired
	protected Converter<Entity, DTO> converter;

	@Override
	public Map<String, Object> getAll() {
		Map<String, Object> map = new LinkedHashMap<>();
		try {
			Iterable<Entity> entities = repository.findAll();
			Iterable<DTO> dtos = converter.toDTOList(entities);
			map.put(API.GEN_DATA, dtos);
			map.put(API.GEN_MSG, API.GEN_FOUNDS);
			return map;
		} catch (Exception e) {
			map.put(API.GEN_MSG, API.GEN_NOT_FOUNDS);
			return map;
		}
	}

	@Override
	public Map<String, Object> create(DTO dto) {
		Map<String, Object> map = new LinkedHashMap<>();
		try {
			repository.save(converter.toEntity(dto));
			map.put(API.GEN_MSG, API.GEN_CRE_SUCCESS);
			map.put(API.GEN_DATA, dto);
			return map;
		} catch (Exception ex) {
			map.put(API.GEN_MSG, ex.getCause().getMessage());
			return map;
		}
	}

	@Override
	public Map<String, Object> read(Long id) {
		Map<String, Object> map = new LinkedHashMap<>();
		Optional<Entity> optionalEntity = repository.findById(id);

		if (optionalEntity.isPresent()) {
			try{
				Entity foundEntity = optionalEntity.get();
				DTO dto = converter.toDTO(foundEntity);
				map.put(API.GEN_MSG, API.GEN_FOUND);
				map.put(API.GEN_DATA, dto);
			}catch (Exception ex){
				map.put(API.GEN_MSG, ex.getCause().getMessage());
			}
        }else{
			map.put(API.GEN_MSG, API.GEN_NOT_FOUND);
        }
        return map;
    }

	@Override
	public String update(DTO dto) {
		try {
			repository.save(converter.toEntity(dto));
			return API.GEN_UPD_SUCCESS;
		} catch (Exception e) {
			return e.getCause().getMessage();
		}
	}

	@Override
	public String delete(Long id) {
		try {
			if (repository.existsById(id)) {
				repository.deleteById(id);
				return API.GEN_DEL_SUCCESS;
			} else {
				return API.GEN_NOT_FOUND;
			}
		} catch (EmptyResultDataAccessException ex) {
			return API.GEN_DATA_NOT_EXISTS;
		} catch (DataIntegrityViolationException ex) {
			return API.DEL_NOT_DELETED;
		} catch (Exception ex) {
			return API.DEL_GEN_ERR;
		}
	}

}
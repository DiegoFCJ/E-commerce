package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import com.nuraghenexus.officeoasis.service.ServiceDTO;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * AbstractController is a generic abstract class that provides common CRUD operations for controllers.
 *
 * @param <DTO> The DTO (Data Transfer Object) type handled by the controller.
 */
public abstract class AbstractController<DTO> {

	@Autowired
	private ServiceDTO<DTO> service;

	/**
	 * Retrieves all entities.
	 *
	 * @return ResponseEntity containing a map with the result of the operation and HTTP status.
	 */
	@GetMapping(API.GET_ALL)
	public ResponseEntity<Map<String, Object>> getAll() {
		return ResponseUtilController.handleGenericResponse(
				service.getAll(),
				API.GEN_FOUNDS);
	}

	/**
	 * Creates a new entity.
	 *
	 * @param dto The DTO object containing data for the new entity.
	 * @return ResponseEntity containing a map with the result of the operation and HTTP status.
	 */
	@PostMapping(API.CREATE)
	public ResponseEntity<Map<String, Object>> create(@RequestBody DTO dto) {
		return ResponseUtilController.handleGenericResponse(
				service.create(dto),
				API.GEN_CRE_SUCCESS);
	}

	/**
	 * Retrieves a single entity by its ID.
	 *
	 * @param id The ID of the entity to retrieve.
	 * @return ResponseEntity containing a map with the result of the operation and HTTP status.
	 */
	@GetMapping(API.READ)
	public ResponseEntity<Map<String, Object>> read(@RequestParam(API.ID) Long id) {
		return ResponseUtilController.handleGenericResponse(
				service.read(id),
				API.GEN_FOUND);
	}

	/**
	 * Updates an existing entity.
	 *
	 * @param dto The DTO object containing updated data for the entity.
	 * @return ResponseEntity containing a map with the result of the operation and HTTP status.
	 */
	@PutMapping(API.UPDATE)
	public ResponseEntity<Map<String, Object>> update(@RequestBody DTO dto) {
		Map<String, Object> map = new LinkedHashMap<>();
		map.put(API.GEN_MSG, service.update(dto));
		return ResponseUtilController.handleGenericResponse(
				map,
				API.GEN_UPD_SUCCESS);
	}

	/**
	 * Deletes an entity by its ID.
	 *
	 * @param id The ID of the entity to delete.
	 * @return ResponseEntity containing a map with the result of the operation and HTTP status.
	 */
	@DeleteMapping(API.DELETE)
	public ResponseEntity<Map<String, Object>> delete(@RequestParam(API.ID) Long id) {
		Map<String, Object> map = new LinkedHashMap<>();
		map.put(API.GEN_MSG, service.delete(id));
		return ResponseUtilController.handleDeleteResponse(map);
	}
}

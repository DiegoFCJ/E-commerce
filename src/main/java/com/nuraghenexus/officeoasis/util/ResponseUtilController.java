package com.nuraghenexus.officeoasis.util;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.dto.utils.FindByEoURequest;
import com.nuraghenexus.officeoasis.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * ResponseUtilController provides utility methods for handling generic responses and delete responses.
 */
public class ResponseUtilController {

    /**
     * Handles a generic response based on a specified case.
     *
     * @param map         The map containing response data.
     * @param caseToCheck The case to check against the response.
     * @return ResponseEntity containing the mapped response and appropriate HTTP status.
     */
    public static ResponseEntity<Map<String, Object>> handleGenericResponse(
            Map<String, Object> map,
            String caseToCheck)
    {
        String response = map.get(API.GEN_MSG).toString();
        if (response.equals(caseToCheck)) {
            map.put(API.GEN_MSG, response);
            return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
        } else if(response.contains(API.GEN_NOT_FOUND_CHECK)){
            map.put(API.GEN_MSG, response);
            return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
        } else {
            map.put(API.GEN_MSG, response);
            return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    /**
     * Handles a delete response with specific cases.
     *
     * @param map The map containing response data.
     * @return ResponseEntity containing the mapped response and appropriate HTTP status.
     */
    public static ResponseEntity<Map<String, Object>> handleDeleteResponse(
            Map<String, Object> map) {
        String response = map.get(API.GEN_MSG).toString();
        switch (response) {
            case API.GEN_DEL_SUCCESS -> {
                map.put(API.GEN_MSG, response);
                return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
            }
            case API.GEN_NOT_FOUND, API.GEN_DATA_NOT_EXISTS -> {
                map.put(API.GEN_MSG, response);
                return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
            }
            case API.DEL_NOT_DELETED -> {
                map.put(API.GEN_MSG, response);
                return new ResponseEntity<>(map, HttpStatus.CONFLICT);
            }
            default -> {
                map.put(API.GEN_MSG, response);
                return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
            }
        }
    }
    /**
     * Handles authentication responses by constructing a ResponseEntity.
     * @param map A map containing response data and status information.
     * @return A ResponseEntity containing the response data and status information.
     */
    public static ResponseEntity<Map<String, Object>> handleAuthResponses(Map<String, Object> map) {
        HttpStatus status = (HttpStatus) map.get(API.GEN_STATUS);
        map.remove(API.GEN_STATUS);
        return new ResponseEntity<>(map, status);
    }

    /**
     * Handles verification token responses based on the provided response and case to check.
     * @param response The response to handle.
     * @param caseToCheck The case to check against the response.
     * @return ResponseEntity containing a map with the appropriate response message and status.
     */
    public static ResponseEntity<Map<String, Object>> handleVTKResponses(
            String response,
            String caseToCheck)
    {
        Map<String, Object> map = new LinkedHashMap<>();
        if (response.equals(caseToCheck)) {
            map.put(API.GEN_MSG, response);
            return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
        } else if(response.contains(API.GEN_NOT_FOUND_CHECK)){
            map.put(API.GEN_MSG, response);
            return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
        } else {
            map.put(API.GEN_MSG, response);
            return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    /**
     * Converts a UserDTO object to a User object.
     * @param findByEoURequest The UserDTO object to convert.
     * @return User object converted from the UserDTO object.
     */
    public static User handleVTKRecoveryUser(FindByEoURequest findByEoURequest) {
        return new User(
                findByEoURequest.getId(),
                findByEoURequest.getEmail(),
                findByEoURequest.getUsername(),
                findByEoURequest.isAccountNonLocked(),
                findByEoURequest.isEnabled()
        );
    }
}
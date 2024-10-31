package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.dto.*;
import com.nuraghenexus.officeoasis.service.*;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;
import java.util.Map;

@RestController
@RequestMapping(API.USER_REQ_MAP)
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
public class UserController extends AbstractController<UserDTO>{

	@Autowired
	private UserService userService;

	@GetMapping(API.USER_REQ_USER_BY_E_U)
	public ResponseEntity<Map<String, Object>> getUserByEmailOrUsername(@RequestParam String emailOrUsername){
		return ResponseUtilController.handleGenericResponse(
				userService.getUserByEmailOrUsername(emailOrUsername),
				API.GEN_FOUND
		);
	}

}

// user via
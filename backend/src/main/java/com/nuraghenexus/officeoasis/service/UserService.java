package com.nuraghenexus.officeoasis.service;

import com.nuraghenexus.officeoasis.config.jwt.JwtService;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.converter.UserConverter;
import com.nuraghenexus.officeoasis.dto.UserDTO;
import com.nuraghenexus.officeoasis.dto.utils.AuthResponse;
import com.nuraghenexus.officeoasis.dto.utils.RegisterRequest;
import com.nuraghenexus.officeoasis.dto.utils.LoginRequest;
import com.nuraghenexus.officeoasis.model.enumerations.RegistrationValidities;
import com.nuraghenexus.officeoasis.model.enumerations.Roles;
import com.nuraghenexus.officeoasis.util.UserValidationUtils;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import com.nuraghenexus.officeoasis.repository.UserRepository;
import com.nuraghenexus.officeoasis.model.User;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

/**
 * Service class for managing user-related operations.
 */
@Service
public class UserService extends AbstractService<User, UserDTO> implements UserDetailsService {

	@Autowired
	private UserConverter converter;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private Argon2PasswordEncoder encoder;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private VTokenService vTokenService;

	private final UserValidationUtils userVUtils = new UserValidationUtils();

	/**
	 * Loads a user by their username from the user repository.
	 *
	 * @param username The username of the user to load.
	 * @return The UserDetails object representing the user.
	 * @throws UsernameNotFoundException if the user is not found.
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepo.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException(API.usernameExc(username)));
	}

	/**
	 * Registers a new user based on the provided authentication request.
	 *
	 * @param request The authentication request containing user details.
	 * @return A map containing the registration response.
	 */
	public Map<String, Object> register(RegisterRequest request) {
		Map<String, Object> map = new LinkedHashMap<>();
		switch (userVUtils.checkRegistrationValidity(request)) {
			// Handling cases where registration fails due to conflicts or invalid data
			case USERNAME_AND_EMAIL_EXISTS:
				map.put(API.GEN_MSG, API.AUTH_USERNAME_AND_EMAIL_CONFLICT);
				map.put(API.GEN_STATUS, HttpStatus.CONFLICT);
				break;
			case USERNAME_EXISTS:
				map.put(API.GEN_MSG, API.AUTH_USERNAME_CONFLICT);
				map.put(API.GEN_STATUS, HttpStatus.CONFLICT);
				break;
			case EMAIL_EXISTS:
				map.put(API.GEN_MSG, API.AUTH_EMAIL_CONFLICT);
				map.put(API.GEN_STATUS, HttpStatus.CONFLICT);
				break;
			case INVALID_EMAIL:
				map.put(API.GEN_MSG, API.AUTH_INVALID_EMAIL);
				map.put(API.GEN_STATUS, HttpStatus.BAD_REQUEST);
				break;
			case INVALID_USERNAME:
				map.put(API.GEN_MSG, API.AUTH_INVALID_USERNAME);
				map.put(API.GEN_STATUS, HttpStatus.BAD_REQUEST);
				break;
			case INVALID_PASSWORD:
				map.put(API.GEN_MSG, API.AUTH_INVALID_PASSWORD);
				map.put(API.GEN_STATUS, HttpStatus.BAD_REQUEST);
				break;
			// If registration data is valid, proceed with registration
			case VALID:
				return registerValidCase(map, request);
			// Handling other cases such as internal server errors
			default:
				map.put(API.GEN_STATUS, HttpStatus.INTERNAL_SERVER_ERROR);
				map.put(API.GEN_MSG, API.AUTH_SOMETHING_WENT_WRONG);
				break;
		}
		return map;
	}

	/**
	 * Handles the registration process for a valid registration case.
	 *
	 * @param map     The map to store the registration response.
	 * @param request The authentication request containing user details.
	 * @return A map containing the registration response.
	 */
	private Map<String, Object> registerValidCase(Map<String, Object> map, RegisterRequest request) {
		User userToRegister = toUserForRegister(request);
		try {
			repository.save(userToRegister);
		} catch (Exception ex) {
			map.put(API.GEN_STATUS, HttpStatus.NOT_ACCEPTABLE);
			map.put(API.GEN_MSG, API.AUTH_INVALID_EMAIL);
			return map;
		}
		String respFromEmailServ = vTokenService.sendMail(userToRegister, API.VTK_TYPE_A);
		if (Objects.equals(respFromEmailServ, API.VTK_SUCCESS_SEND_MAIL)) {
			map.put(API.GEN_STATUS, HttpStatus.CREATED);
			map.put(API.GEN_MSG, API.AUTH_REGISTRATION_SUCCESS);
		} else {
			map.put(API.GEN_STATUS, HttpStatus.NOT_ACCEPTABLE);
			map.put(API.GEN_MSG, respFromEmailServ);
		}
		return map;
	}

	/**
	 * Authenticates a user based on the provided login credentials.
	 *
	 * @param userToCheck The login credentials of the user.
	 * @return A map containing the authentication response.
	 */
	public Map<String, Object> authenticate(LoginRequest userToCheck) {
		Map<String, Object> map = new LinkedHashMap<>();
		if (!userVUtils.isValidEmail(userToCheck.getUsername())) {
			if (userVUtils.doesUsernameExists(userToCheck.getUsername())) {
				Optional<User> userResultToConvert = userRepo.findByUsername(userToCheck.getUsername());
				return userChecksForLog(userToCheck, map, userResultToConvert);
			}
			map.put(API.GEN_MSG, API.AUTH_USERNAME_ERR);
		} else if (userVUtils.isValidEmail(userToCheck.getUsername())) {
			if (userVUtils.doesEmailExists(userToCheck.getUsername())) {
				Optional<User> userResultToConvert = userRepo.findByEmail(userToCheck.getUsername());
				return userChecksForLog(userToCheck, map, userResultToConvert);
			}
			map.put(API.GEN_MSG, API.AUTH_EMAIL_ERR);
		} else {
			map.put(API.GEN_MSG, API.AUTH_ACCOUNT_NOT_EXISTS);
		}
		map.put(API.GEN_STATUS, HttpStatus.NOT_ACCEPTABLE);
		return map;
	}

	/**
	 * Checks the authentication process for a user based on the provided credentials.
	 *
	 * @param userToCheck         The login credentials of the user.
	 * @param map                 The map to store the authentication response.
	 * @param userResultToConvert The optional user data retrieved from the repository.
	 * @return A map containing the authentication response.
	 */
	private Map<String, Object> userChecksForLog(LoginRequest userToCheck, Map<String, Object> map, Optional<User> userResultToConvert) {
		if (userResultToConvert.isPresent()) {
			User userConverted = userResultToConvert.get();
			AuthResponse authResponse = converter.convertToAuthResponseDTO(userConverted);
			if (encoder.matches(userToCheck.getPassword(), userConverted.getPassword())) {
				if (userConverted.isEnabled()) {
					String jwtToken = jwtService.generateToken(userConverted);
					map.put(API.GEN_DATA, authResponse);
					map.put(API.GEN_MSG, API.AUTH_LOGGED_IN);
					map.put(API.GEN_TKN, jwtToken);
					map.put(API.GEN_STATUS, HttpStatus.ACCEPTED);
					return map;
				} else {
					map.put(API.GEN_MSG, API.AUTH_GO_TO_MAIL);
					map.put(API.GEN_STATUS, HttpStatus.NOT_ACCEPTABLE);
					return map;
				}
			} else {
				map.put(API.GEN_MSG, API.AUTH_PASS_ERR);
				map.put(API.GEN_STATUS, HttpStatus.NOT_ACCEPTABLE);
				return map;
			}
		}
		map.put(API.GEN_MSG, API.AUTH_ACCOUNT_NOT_EXISTS);
		map.put(API.GEN_STATUS, HttpStatus.NOT_ACCEPTABLE);
		return map;
	}

	/**
	 * Converts the provided authentication request to a User object for registration.
	 *
	 * @param request The authentication request containing user details.
	 * @return The User object created for registration.
	 */
	public User toUserForRegister(RegisterRequest request) {
		User user = null;
		if (request != null) {
			user = User.builder()
					.email(request.getEmail())
					.username(request.getUsername())
					.password(encoder.encode(request.getPassword()))
					.createdAt(LocalDateTime.now())
					.isAccountNonLocked(false)
					.isEnabled(false)
					.role(Roles.USER)
					.build();
		}
		return user;
	}

	/**
	 * Retrieves user data from the repository based on the provided email or username.
	 *
	 * @param emailOrUsername The email or username of the user to retrieve.
	 * @return A map containing the user data if found, or a message indicating user not found.
	 */
	public Map<String, Object> getUserByEmailOrUsername(String emailOrUsername) {
		Map<String, Object> map = new LinkedHashMap<>();
		Optional<User> userByEmail = userRepo.findByEmail(emailOrUsername);
		Optional<User> userByUsername = userRepo.findByUsername(emailOrUsername);
		if (userByEmail.isPresent()) {
			map.put(API.GEN_MSG, API.GEN_FOUND);
			map.put(API.GEN_DATA, converter.toUserForVT(userByEmail.get()));
			return map;
		} else if (userByUsername.isPresent()) {
			map.put(API.GEN_MSG, API.GEN_FOUND);
			map.put(API.GEN_DATA, converter.toUserForVT(userByUsername.get()));
			return map;
		} else {
			map.put(API.GEN_MSG, API.USER_NOT_FOUND);
		}
		return map;
	}

	/**
	 * Creates a new user. Currently not implemented.
	 * @param userDTO The UserDTO object containing user data.
	 * @return ResponseEntity containing the operation result.
	 */
	@Override
	public Map<String, Object> create(UserDTO userDTO) {
		Map<String, Object> map = new LinkedHashMap<>();
		map.put(API.GEN_MSG, API.GEN_CANT_USE_API);
		return map;
	}

	/**
	 * Retrieves All users. Currently not implemented.
	 * @return ResponseEntity containing the operation result.
	 */
	@Override
	public Map<String, Object> getAll() {
		Map<String, Object> map = new LinkedHashMap<>();
		map.put(API.GEN_MSG, API.GEN_CANT_USE_API);
		return map; //new ResponseEntity<>(map, HttpStatus.NOT_IMPLEMENTED);
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
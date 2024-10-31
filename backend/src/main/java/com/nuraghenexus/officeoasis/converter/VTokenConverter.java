package com.nuraghenexus.officeoasis.converter;

import com.nuraghenexus.officeoasis.dto.VerificationTokenDTO;
import com.nuraghenexus.officeoasis.dto.utils.FindByEoURequest;
import com.nuraghenexus.officeoasis.model.User;
import com.nuraghenexus.officeoasis.model.VerificationToken;
import org.springframework.stereotype.Component;

/**
 * This component class converts VerificationToken objects to VerificationTokenDTO objects and vice versa, and also provides conversion for User objects to UserDTO objects.
 */
@Component
public class VTokenConverter extends AbstractConverter<VerificationToken, VerificationTokenDTO> {

	/**
	 * Converts a VerificationTokenDTO object to a VerificationToken object.
	 *
	 * @param verificationTokenDTO The VerificationTokenDTO object to be converted.
	 * @return A VerificationToken object.
	 */
	@Override
	public VerificationToken toEntity(VerificationTokenDTO verificationTokenDTO) {
		VerificationToken vToken = null;

		if (verificationTokenDTO != null) {
			vToken = new VerificationToken(
					verificationTokenDTO.getId(),
					verificationTokenDTO.getToken(),
					verificationTokenDTO.getCreatedAt(),
					verificationTokenDTO.getExpiredAt(),
					verificationTokenDTO.getConfirmedAt(),
					new User(
							verificationTokenDTO.getFindByEoURequest().getId(),
							verificationTokenDTO.getFindByEoURequest().getEmail(),
							verificationTokenDTO.getFindByEoURequest().getUsername(),
							"",
							true,
							verificationTokenDTO.getFindByEoURequest().isEnabled(),
							null,
							null
					)
			);
		}
		return vToken;
	}

	/**
	 * Converts a VerificationToken object to a VerificationTokenDTO object.
	 *
	 * @param vToken The VerificationToken object to be converted.
	 * @return A VerificationTokenDTO object.
	 */
	@Override
	public VerificationTokenDTO toDTO(VerificationToken vToken) {
		VerificationTokenDTO verificationTokenDTO = null;
		if (vToken != null) {
			verificationTokenDTO = new VerificationTokenDTO(
					vToken.getId(),
					vToken.getToken(),
					vToken.getCreatedAt(),
					vToken.getExpiredAt(),
					vToken.getConfirmedAt(),
					new FindByEoURequest(
							vToken.getUser().getId(),
							vToken.getUser().getEmail(),
							vToken.getUser().getUsername(),
							vToken.getUser().isEnabled(),
							vToken.getUser().isAccountNonLocked()
					)
			);

		}
		return verificationTokenDTO;
	}

	/**
	 * Converts a User object to a UserDTO object.
	 *
	 * @param user The User object to be converted.
	 * @return A UserDTO object.
	 */
	public FindByEoURequest toUserForVT(User user) {
		FindByEoURequest findByEoURequest = null;
		if (user != null) {
			findByEoURequest = new FindByEoURequest(
					user.getId(),
					user.getEmail(),
					user.getUsername(),
					user.isEnabled(),
					user.isAccountNonLocked()
			);
		}
		return findByEoURequest;
	}
}

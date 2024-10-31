package com.nuraghenexus.officeoasis.dto;

import com.nuraghenexus.officeoasis.model.enumerations.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private Long id;
	private String email;
	private String username;
	private String password;
	private boolean isAccountNonLocked;
	private boolean isEnabled;
	private LocalDateTime createdAt;
	private Roles role;
}
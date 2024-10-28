package com.nuraghenexus.officeoasis.model;

import com.nuraghenexus.officeoasis.model.enumerations.Roles;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class User implements UserDetails {

	@Id
	@OnDelete(action = OnDeleteAction.CASCADE)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String email;

	@Column(unique = true)
	private String username;
	private String password;
	private boolean isAccountNonLocked;
	private boolean isEnabled;
	private LocalDateTime createdAt;

	@Enumerated(EnumType.STRING)
	private Roles role;

	public User(Long id, boolean isAccountNonLocked, boolean isEnabled) {
		this.id = id;
		this.isAccountNonLocked = isAccountNonLocked;
		this.isEnabled = isEnabled;
	}

	public User(Long id, String email, String username, boolean isAccountNonLocked, boolean isEnabled) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.isAccountNonLocked = isAccountNonLocked;
		this.isEnabled = isEnabled;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return isAccountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.isEnabled;
	}

}

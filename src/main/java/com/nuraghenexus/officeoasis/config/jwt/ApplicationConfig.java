package com.nuraghenexus.officeoasis.config.jwt;

import com.nuraghenexus.officeoasis.constants.JWT;
import com.nuraghenexus.officeoasis.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

/**
 * Configuration class for JWT authentication in the application.
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    @Autowired
    UserRepository userRepository;

    /**
     * Bean method to configure the user details service.
     *
     * @return UserDetailsService object with custom implementation.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(JWT.USR_NOT_FOUND));
    }

    /**
     * Bean method to configure the authentication provider.
     *
     * @return AuthenticationProvider object with custom implementation.
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService());
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    /**
     * Bean method to configure the authentication manager.
     *
     * @param config AuthenticationConfiguration object.
     * @return AuthenticationManager object with custom configuration.
     * @throws Exception if an error occurs during configuration.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Bean method to configure the password encoder.
     *
     * @return Argon2PasswordEncoder object for password encoding.
     */
    @Bean
    public Argon2PasswordEncoder passwordEncoder() {
        return new Argon2PasswordEncoder();
    }
}

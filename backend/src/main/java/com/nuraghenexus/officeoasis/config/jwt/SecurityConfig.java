package com.nuraghenexus.officeoasis.config.jwt;

import com.nuraghenexus.officeoasis.constants.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Configuration class for Spring Security settings.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    JwtAuthenticationFilter jwtAuthFilter;

    @Autowired
    AuthenticationProvider authenticationProvider;

    /**
     * Configures the security filter chain.
     *
     * @param http HttpSecurity object to configure security settings.
     * @return SecurityFilterChain object representing the security filter chain.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CORS (Cross-Origin Resource Sharing)
                .cors(AbstractHttpConfigurer::disable)
                // Disable CSRF (Cross-Site Request Forgery)
                .csrf(AbstractHttpConfigurer::disable)
                // Configure authorization rules for different endpoints
                .authorizeHttpRequests(authorize -> authorize
                        // Permit access to authentication and token endpoints
                        .requestMatchers(new AntPathRequestMatcher(JWT.AUTH)).permitAll()
                        .requestMatchers(new AntPathRequestMatcher(JWT.VTK)).permitAll()
                        // Permit access to specific endpoints
                        .requestMatchers(JWT.SWA_APIS, JWT.SWA_BASE).permitAll()
                        // Permit access to any other endpoint
                        .anyRequest().permitAll()
                )
                // Set session creation policy to STATELESS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Set custom authentication provider
                .authenticationProvider(authenticationProvider)
                // Add JWT authentication filter before UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        // Build and return the security filter chain
        return http.build();
    }
}

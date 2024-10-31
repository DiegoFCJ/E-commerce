package com.nuraghenexus.officeoasis.config.jwt;

import com.nuraghenexus.officeoasis.constants.JWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

/**
 * Custom filter for JWT authentication.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    UserDetailsService userDetailsService;

    /**
     * Method to perform the actual authentication logic.
     *
     * @param request     HttpServletRequest object.
     * @param response    HttpServletResponse object.
     * @param filterChain FilterChain object for chaining filters.
     * @throws ServletException if a servlet exception occurs.
     * @throws IOException      if an I/O exception occurs.
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader(JWT.GET_HEADER);
        final String jwt;
        final String userEmail;

        // Check if the authorization header is present and starts with Bearer
        if (authHeader == null || !authHeader.startsWith(JWT.BEARER)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract the JWT token
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);

        // Check if user email is present and authentication is not already set
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // Validate the JWT token
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                // Set authentication details
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set authentication in security context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}

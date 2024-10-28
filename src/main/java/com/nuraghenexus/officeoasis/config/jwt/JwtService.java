package com.nuraghenexus.officeoasis.config.jwt;

import com.nuraghenexus.officeoasis.constants.JWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Value;

/**
 * Service class for JWT operations such as token generation, validation, and extraction.
 */
@Service
public class JwtService {

    @Value(JWT.SECRET_KEY)
    private String secretKey;

    /**
     * Extracts the username from the JWT token.
     *
     * @param token JWT token string.
     * @return Username extracted from the token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Generates a JWT token.
     *
     * @param extractClaims Additional claims to include in the token.
     * @param userDetails  UserDetails object representing the user.
     * @return Generated JWT token.
     */
    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails){
        return Jwts.builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Checks if a JWT token is valid.
     *
     * @param token      JWT token string.
     * @param userdetils UserDetails object representing the user.
     * @return True if the token is valid, false otherwise.
     */
    public boolean isTokenValid(String token, UserDetails userdetils){
        final String username = extractUsername(token);
        return (username.equals(userdetils.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Checks if a JWT token is expired.
     *
     * @param token JWT token string.
     * @return True if the token is expired, false otherwise.
     */
    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts the expiration date from the JWT token.
     *
     * @param token JWT token string.
     * @return Expiration date of the token.
     */
    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Generates a JWT token using UserDetails object.
     *
     * @param userDetails UserDetails object representing the user.
     * @return Generated JWT token.
     */
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Extracts a specific claim from the JWT token.
     *
     * @param token          JWT token string.
     * @param claimsTFunction Function to extract a specific claim.
     * @param <T>            Type of the claim.
     * @return Extracted claim.
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsTFunction){
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    /**
     * Extracts all claims from the JWT token.
     *
     * @param token JWT token string.
     * @return All claims from the token.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Gets the signing key for JWT.
     *
     * @return Signing key for JWT.
     */
    private Key getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
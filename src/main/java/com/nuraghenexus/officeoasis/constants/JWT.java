package com.nuraghenexus.officeoasis.constants;

public class JWT {
    //JWT
    //ApplicationConfig
    public static final String USR_NOT_FOUND = "User not found";

    //JwtAuthenticationFilter
    public static final String GET_HEADER = "Authorization";
    public static final String BEARER = "Bearer ";

    //JwtService
    public static final String SECRET_KEY = "${secret.key}";

    //SecurityConfig
    //API
    public static final String AUTH = "/api/v1/auth/**";

    //VTK
    public static final String VTK = "/api/v1/email/**";

    //SWAGGER
    public static final String SWA_BASE = "/swagger-ui/**";
    public static final String SWA_APIS = "/v3/api-docs/**";

}

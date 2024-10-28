package com.nuraghenexus.officeoasis.config;

import com.nuraghenexus.officeoasis.constants.PROP;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for CORS (Cross-Origin Resource Sharing).
 */
@Configuration
public class CorsConfig {

    @Value(PROP.CORS_ORIGIN_PROP)
    private String allowedOrigins;

    /**
     * Bean method to configure CORS.
     *
     * @return WebMvcConfigurer object with CORS configuration.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping(PROP.CORS_MAPPING)
                        .allowedOrigins(allowedOrigins)
                        .allowedMethods(PROP.CORS_GET, PROP.CORS_POST, PROP.CORS_PUT, PROP.CORS_PATCH, PROP.CORS_DELETE)
                        .allowedHeaders(PROP.CORS_HEADERS);
            }
        };
    }
}

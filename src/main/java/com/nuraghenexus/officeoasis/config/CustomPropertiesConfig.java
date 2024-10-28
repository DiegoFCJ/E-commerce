package com.nuraghenexus.officeoasis.config;

import com.nuraghenexus.officeoasis.constants.PROP;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * Configuration class for loading custom properties.
 */
@Configuration
@PropertySource({PROP.APPLICATION, PROP.SECRETS})
public class CustomPropertiesConfig {
}

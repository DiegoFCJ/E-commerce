package com.nuraghenexus.officeoasis.constants;

public class PROP {
    public static final String APPLICATION = "classpath:application.properties";
    public static final String SECRETS = "classpath:secrets.properties";

    // VTOKEN
    // EMAIL SENDER
    public static final String MAIL = "${spring.mail.username}";
    public static final String PASS = "${spring.mail.password}";

    // MAIL PROPS
    public static final String MAIL_AUTH = "mail.smtp.auth";
    public static final String MAIL_STARTTLS = "mail.smtp.starttls.enable";
    public static final String MAIL_STARTTLS_V = "smtp.gmail.com";
    public static final String MAIL_HOST = "mail.smtp.host";
    public static final String MAIL_HOST_V = "587";
    public static final String MAIL_PORT = "mail.smtp.port";

    // CORS
    public static final String CORS_ORIGIN_PROP = "${allowed.origin}";
    public static final String CORS_MAPPING = "/**";
    public static final String CORS_HEADERS = "*";
    public static final String CORS_GET = "GET";
    public static final String CORS_POST = "POST";
    public static final String CORS_PUT = "PUT";
    public static final String CORS_PATCH = "PATCH";
    public static final String CORS_DELETE = "DELETE";
}

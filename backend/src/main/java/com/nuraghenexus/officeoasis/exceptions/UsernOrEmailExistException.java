package com.nuraghenexus.officeoasis.exceptions;

import org.springframework.security.core.AuthenticationException;

public class UsernOrEmailExistException extends AuthenticationException {

    public UsernOrEmailExistException(final String msg) {
        super(msg);
    }

}

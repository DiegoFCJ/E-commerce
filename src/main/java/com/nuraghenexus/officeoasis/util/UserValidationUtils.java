package com.nuraghenexus.officeoasis.util;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.dto.utils.RegisterRequest;
import com.nuraghenexus.officeoasis.model.enumerations.RegistrationValidities;
import com.nuraghenexus.officeoasis.repository.UserRepository;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import org.springframework.beans.factory.annotation.Autowired;

public class UserValidationUtils {

    @Autowired
    private UserRepository userRepo;

    /**
     * Checks if the provided string is a valid email address.
     *
     * @param email The string to check.
     * @return boolean true if the string is a valid email address, false otherwise.
     */
    public boolean isValidEmail(String email) {
        try {
            InternetAddress internetAddress = new InternetAddress(email);
            internetAddress.validate();
            return true;
        } catch (AddressException ex) {
            return false;
        }
    }

    /**
     * Checks if the provided string is a valid username.
     *
     * @param username The string to check.
     * @return boolean true if the string is a valid username, false otherwise.
     */
    public boolean isValidUsername(String username) {
        //Check if the username is not null and has a length between 3 and 15 characters
        if (username != null && username.length() >= 3 && username.length() <= 15) {
            //Check if the username contains only lowercase alphanumeric characters
            return username.matches(API.USER_REGEX_USRNM);
        } else {
            return false;
        }
    }

    /**
     * Checks if the provided string is a valid username.
     *
     * @param password The string to check.
     * @return boolean true if the string is a valid username, false otherwise.
     */
    public boolean isValidPassword(String password) {
        //Check if the username is not null and has a length between 3 and 15 characters
        if (password != null && password.length() >= 8 && password.length() <= 25) {
            //Check if the username contains only lowercase alphanumeric characters
            return password.matches( API.USER_REGEX_PASS);
        } else {
            return false;
        }
    }

    /**
     * Checks the validity of the registration data provided in the authentication request.
     *
     * @param request The authentication request containing user details.
     * @return The registration validity status.
     */
    public RegistrationValidities checkRegistrationValidity(RegisterRequest request) {
        if (isValidEmail(request.getEmail())) {
            if (isValidUsername(request.getUsername())) {
                if (isValidPassword(request.getPassword())) {
                    if (doesUsernameExists(request.getUsername()) && doesEmailExists(request.getEmail())) {
                        return RegistrationValidities.USERNAME_AND_EMAIL_EXISTS;
                    }
                    if (doesUsernameExists(request.getUsername())) {
                        return RegistrationValidities.USERNAME_EXISTS;
                    }
                    if (doesEmailExists(request.getEmail())) {
                        return RegistrationValidities.EMAIL_EXISTS;
                    }
                    return RegistrationValidities.VALID;
                }
                return RegistrationValidities.INVALID_PASSWORD;
            }
            return RegistrationValidities.INVALID_USERNAME;
        }
        return RegistrationValidities.INVALID_EMAIL;
    }

    /**
     * Checks if a username already exists.
     * @param username The username to check.
     * @return true if the username exists, false otherwise.
     */
    public boolean doesUsernameExists(String username){
        return userRepo.findByUsername(username).isPresent();
    }

    /**
     * Checks if an email already exists.
     * @param email The email to check.
     * @return true if the email exists, false otherwise.
     */
    public boolean doesEmailExists(String email){
        return userRepo.findByEmail(email).isPresent();
    }
}

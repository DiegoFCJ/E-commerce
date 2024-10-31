package com.nuraghenexus.officeoasis.service;
import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.constants.PROP;
import com.nuraghenexus.officeoasis.converter.VTokenConverter;
import com.nuraghenexus.officeoasis.dto.VerificationTokenDTO;
import com.nuraghenexus.officeoasis.dto.utils.PasswordRecoveryRequest;
import com.nuraghenexus.officeoasis.dto.utils.FindByEoURequest;
import com.nuraghenexus.officeoasis.model.User;
import com.nuraghenexus.officeoasis.model.VerificationToken;
import com.nuraghenexus.officeoasis.repository.VTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Service class for handling verification tokens and email-related operations.
 */
@Service
public class VTokenService extends AbstractService<VerificationToken, VerificationTokenDTO> {

    @Value(PROP.MAIL)
    String myAccountEmail;

    @Value(PROP.PASS)
    String password;

    @Autowired
    VTokenConverter vTokenConverter;

    @Autowired
    VTokenRepository vTokenRepository;

    @Autowired
    private Argon2PasswordEncoder encoder;

    /**
     * Sends an email to the user based on the specified type.
     *
     * @param user The user to send the email to.
     * @param type The type of email to send (activation or recovery).
     * @return A string indicating the result of the email sending operation.
     */
    public String sendMail(User user, String type) {
        VerificationToken vToken = null;

        if (type.equals(API.VTK_TYPE_A)) {
            if (doesEnabledTokenExists(user.getEmail())) {
                return API.VTK_ERR_DONE_ALREADY;
            }
        }

        if (type.equals(API.VTK_TYPE_B)) {
            if (hasUnconfirmedToken(user.getId())) {
                return API.VTK_ERR_DONE_ALREADY;
            }
        }

        vToken = tokenPlusUser(user);

        Properties prop = propertiesPreparation();
        Session session = sessionCreation(prop, myAccountEmail);
        MimeMessage msg = prepareMessage(
                type,
                session,
                myAccountEmail,
                vTokenConverter.toUserForVT(user),
                vTokenConverter.toDTO(vToken)
        );

        try {
            assert msg != null;
            Transport.send(msg);
        } catch (Exception e) {
            return API.VTK_ERR_SEND_MAIL;
        }
        vTokenRepository.save(vToken);
        return API.VTK_SUCCESS_SEND_MAIL;
    }

    /**
     * Checks if the user has any unconfirmed verification tokens.
     *
     * @param userId The ID of the user.
     * @return True if the user has unconfirmed tokens, false otherwise.
     */
    public boolean hasUnconfirmedToken(Long userId) {
        List<VerificationToken> vTokensFound = vTokenRepository.findByUserId(userId).stream().toList();

        if (vTokensFound.isEmpty()) {
            return false; // If the list is empty, there are no unconfirmed tokens
        }

        for (VerificationToken token : vTokensFound) {
            if (token.getConfirmedAt() == null) {
                return true; // If at least one token is unconfirmed, return true
            }
        }

        return false; // All tokens are confirmed, so return false
    }

    /**
     * Prepares the properties required for email configuration.
     *
     * @return Properties object containing the email configuration.
     */
    public Properties propertiesPreparation() {
        Properties p = new Properties();
        p.put(PROP.MAIL_AUTH, true);
        p.put(PROP.MAIL_STARTTLS, true);
        p.put(PROP.MAIL_HOST, PROP.MAIL_STARTTLS_V);
        p.put(PROP.MAIL_PORT, PROP.MAIL_HOST_V);
        return p;
    }

    /**
     * Creates a mail session for sending emails.
     *
     * @param prop           Properties object containing email configuration.
     * @param myAccountEmail The email address of the sender.
     * @return The mail session.
     */
    public Session sessionCreation(Properties prop, String myAccountEmail) {
        return Session.getInstance(prop, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, password);
            }
        });
    }

    /**
     * Generates a verification token for the user.
     *
     * @param user The user for whom the token is generated.
     * @return The generated verification token.
     */
    public VerificationToken tokenPlusUser(User user) {
        String token = UUID.randomUUID().toString();
        return new VerificationToken(
                null,
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(API.VTK_EXP_DATE),
                null,
                user
        );
    }

    /**
     * Prepares the email message based on the reason to send.
     *
     * @param reasonToSend   The reason for sending the email (activation or recovery).
     * @param ses            The mail session.
     * @param myAccountEmail The email address of the sender.
     * @param user           The user to whom the email is sent.
     * @param vToken         The verification token.
     * @return The prepared MimeMessage.
     */
    private MimeMessage prepareMessage(
            String reasonToSend,
            Session ses,
            String myAccountEmail,
            FindByEoURequest user,
            VerificationTokenDTO vToken) {
        try {
            MimeMessage msg = new MimeMessage(ses);
            msg.setFrom(new InternetAddress(myAccountEmail));
            msg.setRecipients(MimeMessage.RecipientType.TO, String.valueOf(new InternetAddress(user.getEmail())));

            if (reasonToSend.equals(API.VTK_TYPE_A)) {
                msg.setSubject(API.VTK_subject(API.VTK_RSN_ACTIVE));
                msg.setText(API.VTK_txt_activation(user.getUsername(), vToken.getToken()));
            } else if (reasonToSend.equals(API.VTK_TYPE_B)) {
                msg.setSubject(API.VTK_subject(API.VTK_RSN_RECOVERY));
                msg.setText(API.VTK_txt_recovery(user.getUsername(), vToken.getToken()));
            }

            return msg;
        } catch (MessagingException ex) {
            Logger.getLogger(VTokenService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    /**
     * Checks if there are enabled tokens associated with the specified email.
     *
     * @param email The email address to check.
     * @return True if enabled tokens exist for the email, false otherwise.
     */
    public boolean doesEnabledTokenExists(String email) {
        return vTokenRepository.findAll().stream()
                .filter(tokenFound -> email.equals(tokenFound.getUser().getEmail()))
                .anyMatch(token ->
                        token.getUser().isEnabled() &&
                                token.getUser().isAccountNonLocked());
    }

    /**
     * Confirms the email using the provided token.
     *
     * @param token The verification token.
     * @return A string indicating the result of the email confirmation operation.
     */
    public String confirmEmail(String token) {
        VerificationTokenDTO vTokenFromDb = vTokenConverter.toDTO(vTokenRepository.findByToken(token).orElseThrow(
                () -> new IllegalStateException(API.VTK_ERR_TKN_NOT_FOUND)));


        if (vTokenFromDb.getConfirmedAt() != null) {
            return API.VTK_ERR_CONF_ALREADY;
        }

        if (vTokenFromDb.getExpiredAt().isBefore(LocalDateTime.now())) {
            return API.VTK_ERR_TKN_EXPIRED_REG;
        }

        Long useridForUpdate = vTokenFromDb.getFindByEoURequest().getId();
        String tokenSaved = enableUserAndConfirmToken(useridForUpdate);
        if (tokenSaved.equals(vTokenFromDb.getToken())) {
            return API.VTK_setResp(
                    vTokenFromDb.getFindByEoURequest().getUsername(),
                    vTokenFromDb.getFindByEoURequest().isEnabled());
        }
        return tokenSaved;
    }

    /**
     * Enables the user and confirms the token.
     *
     * @param userIdToUpdate The ID of the user to update.
     * @return The saved token.
     */
    public String enableUserAndConfirmToken(Long userIdToUpdate) {
        VerificationToken token = getToken(userIdToUpdate);
        try {
            token.setConfirmedAt(LocalDateTime.now());
            token.getUser().setEnabled(true);
            token.getUser().setAccountNonLocked(true);
            return vTokenRepository.save(token).getToken();
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    /**
     * Retrieves the verification tokens associated with the specified user.
     *
     * @param userId The ID of the user.
     * @return The verification token associated with the user.
     */
    public VerificationToken getToken(Long userId) {
        List<VerificationToken> vTokensFound = vTokenRepository.findByUserId(userId).stream().toList();

        if (vTokensFound.size() == 1) {
            return vTokensFound.get(0);
        } else {
            return new VerificationToken("0");
        }
    }

    /**
     * Confirms the password recovery using the provided token.
     *
     * @param passwordRecoveryRequest The verification token.
     * @return A string indicating the result of the password recovery confirmation operation.
     */
    public String confirmRecoverPassword(PasswordRecoveryRequest passwordRecoveryRequest) {
        VerificationToken vTokenFromDb = vTokenRepository.findByToken(passwordRecoveryRequest.getToken()).orElseThrow(
                () -> new IllegalStateException(API.VTK_ERR_TKN_NOT_FOUND));

        if (vTokenFromDb.getConfirmedAt() != null) {
            return API.VTK_ERR_TKN_CONF_ALREADY;
        }

        if (vTokenFromDb.getExpiredAt().isBefore(LocalDateTime.now())) {
            return API.VTK_ERR_TKN_EXPIRED_RECOVERY;
        }

        vTokenFromDb.setConfirmedAt(LocalDateTime.now());
        vTokenFromDb.getUser().setPassword(encoder.encode(passwordRecoveryRequest.getPassword()));

        // Save the modified entity in the database
        vTokenRepository.save(vTokenFromDb);

        return API.VTK_CONF;
    }

    /**
     * Deletes a verification token from the database based on the given token.
     *
     * @param token The token to search for and delete.
     * @return A string indicating the outcome of the operation:
     *         - "deleted" if the token was found and successfully deleted.
     *         - "not found" if the token was not found in the database.
     *         - "error" if an error occurred during the deletion process.
     */
    public String deleteTokenByToken(String token) {
        AtomicBoolean tokenDeleted = new AtomicBoolean(false);

        repository.findAll().stream()
                .filter(vTokenFound -> vTokenFound.getToken().equals(token))
                .findFirst()
                .ifPresent(tokenToDelete -> {
                    try {
                        repository.delete(tokenToDelete);
                        tokenDeleted.set(true);
                    } catch (Exception e) {
                        System.out.println(e.getCause().getMessage());
                    }
                });

        if (tokenDeleted.get()) {
            return API.VTK_REC_MAIL_DEL_REQ;
        } else {
            return API.VTK_REC_MAIL_DEL_REQ_BROKEN;
        }
    }
}
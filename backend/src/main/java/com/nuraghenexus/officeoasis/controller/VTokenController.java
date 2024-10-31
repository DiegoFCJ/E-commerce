package com.nuraghenexus.officeoasis.controller;

import com.nuraghenexus.officeoasis.constants.API;
import com.nuraghenexus.officeoasis.dto.VerificationTokenDTO;
import com.nuraghenexus.officeoasis.dto.utils.PasswordRecoveryRequest;
import com.nuraghenexus.officeoasis.dto.utils.FindByEoURequest;
import com.nuraghenexus.officeoasis.service.VTokenService;
import com.nuraghenexus.officeoasis.util.ResponseUtilController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nuraghenexus.officeoasis.constants.PROP;
import java.util.Map;

@RestController
@CrossOrigin(origins = PROP.CORS_ORIGIN_PROP)
@RequestMapping(API.VTK_REQ_MAP)
public class VTokenController extends AbstractController<VerificationTokenDTO> {

    @Autowired
    VTokenService service;

    /**
     * Endpoint for confirming email with token.
     *
     * @param token The token string to confirm email.
     * @return ResponseEntity containing response data and HTTP status code.
     */
    @PostMapping(API.VTK_REQ_ACTIVE)
    public ResponseEntity<Map<String, Object>> confirmation(@RequestBody String token){
        return ResponseUtilController.handleVTKResponses(
                service.confirmEmail(token),
                API.VTK_VALIDATED);
    }

    /**
     * Endpoint for sending recovery mail.
     *
     * @param findByEoURequest The user data for sending recovery mail.
     * @return ResponseEntity containing response data and HTTP status code.
     */
    @PostMapping(API.VTK_REQ_RECOVER)
    public ResponseEntity<Map<String, Object>> sendRecoveryMail(@RequestBody FindByEoURequest findByEoURequest){
        return ResponseUtilController.handleVTKResponses(
                service.sendMail(
                        ResponseUtilController.handleVTKRecoveryUser(findByEoURequest),
                        API.VTK_TYPE_B
                ),
                API.VTK_SUCCESS_SEND_MAIL);
    }

    /**
     * Endpoint for confirming password recovery with token.
     *
     * @param passwordRecoveryRequest The token and password data for confirming password recovery.
     * @return ResponseEntity containing response data and HTTP status code.
     */
    @PostMapping(API.VTK_REQ_CONF_RECOVER)
    public ResponseEntity<Map<String, Object>> confirmRecoverPassword(@RequestBody PasswordRecoveryRequest passwordRecoveryRequest) {
        return ResponseUtilController.handleVTKResponses(
                service.confirmRecoverPassword(passwordRecoveryRequest),
                API.VTK_CONF);
    }

    /**
     * Endpoint for deleting token by token value.
     *
     * @param token The token value to delete.
     * @return ResponseEntity containing response data and HTTP status code.
     */
    @DeleteMapping(API.VTK_REQ_DEL_BY_TKN)
    public ResponseEntity<Map<String, Object>> deleteTokenByToken(@RequestParam String token){
        return ResponseUtilController.handleVTKResponses(
                service.deleteTokenByToken(token),
                API.VTK_REC_MAIL_DEL_REQ);
    }
}

//correggi conferma
//elimina abstract
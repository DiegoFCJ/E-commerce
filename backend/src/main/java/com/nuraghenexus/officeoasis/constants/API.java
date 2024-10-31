package com.nuraghenexus.officeoasis.constants;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public abstract class API {

    /* *******************************  GENERIC  ***************************** */
    public static final String GEN_REQ_VERSION = "/api/v1/";
    public static final String GEN_MSG = "message";
    public static final String GEN_DATA = "data";
    public static final String GEN_TKN = "token";
    public static final String GEN_STATUS = "status";
    public static final String GEN_FOUND = "Trovato!";
    public static final String GEN_NOT_FOUND = "Non trovato!";
    public static final String GEN_FOUNDS = "Trovati!";
    public static final String GEN_NOT_FOUNDS = "Non trovati!";
    public static final String GEN_CRE_SUCCESS = "Creato con successo!";
    public static final String GEN_UPD_SUCCESS = "Aggiornato con successo!";
    public static final String GEN_DEL_SUCCESS = "Eliminato con successo!";
    public static final String GEN_DATA_NOT_EXISTS = "Il dato ricercato non esiste!";
    public static final String GEN_CANT_USE_API = "Non sei abilitato per utilizzare questa api";
    public static final String GEN_NOT_FOUND_CHECK = "on trovat";
    /* *********************************************************************** */




    /* ******************************  ABSTRACT  ****************************** */
    // CONTROLLER
    public static final String GET_ALL = "/getAll";
    public static final String CREATE = "/create";
    public static final String READ = "/read";
    public static final String READ_BY_UID = "/readByUserId";
    public static final String UPDATE = "/update";
    public static final String DELETE = "/delete";
    public static final String ID = "id";

    // SERVICE
    // DELETE
    public static final String DEL_NOT_DELETED = "Impossibile eliminare l'entità a causa di vincoli di integrità dei dati.";
    public static final String DEL_GEN_ERR = "Si è verificato un errore durante l'eliminazione dell'entità.";

    // FUNCTIONS
    /* *********************************************************************** */




    /* ******************************  ADDRESS  ****************************** */
    // CONTROLLER
    public static final String ADDR_REQ_MAP = API.GEN_REQ_VERSION + "address";

    public static final String ADDR_GET_ALL_BY_ANAGR = "/getAllByAnagraphicId";

    public static final String ADDR_ANAGRAPhIC_ID = "anagraphic_id";

    // SERVICE

    public static final String ADDR_IS_EMPTY = "Indirizzi non trovati per l'user selezionata";
    // FUNCTIONS
    /* *********************************************************************** */




    /* ****************************  ANAGRAPHIC  ***************************** */
    // CONTROLLER
    public static final String ANAG_REQ_MAP = API.GEN_REQ_VERSION + "anagraphic";
    public static final String ANAG_USERID = "user_id";

    // SERVICE

    // FUNCTIONS
    /* *********************************************************************** */




    /* ********************************  USER  ******************************* */
    // CONTROLLER
    public static final String USER_REQ_MAP = API.GEN_REQ_VERSION + "user";

    // SERVICE
    public static final String USER_REQ_USER_BY_E_U = "/getUserByEmailOrUsername";
    public static final String USER_NOT_FOUND = "Utente non trovato";
    public static final String USER_REGEX_USRNM = "^(?=.*[0-9])[a-z][a-z0-9]{5,14}$";
    public static final String USER_REGEX_PASS = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$";

    // FUNCTIONS
    public static String usernameExc(String username){
        return String.format("Utente con username %s non trovato", username);
    }
    /* *********************************************************************** */




    /* ***************************  AUTHENTICATION  ************************** */
    // CONTROLLER
    public static final String AUTH_REQ_MAP = API.GEN_REQ_VERSION + "auth";
    public static final String AUTH_REGISTER = "/register";
    public static final String AUTH_AUTHENTICATE = "/authenticate";

    // SERVICE

    // SUCCESS
    public static final String AUTH_REGISTRATION_SUCCESS = "Registrazione avvenuta con successo! Riceverai una mail al tuo Address di posta elettronica, se non la trovi controlla la cartella spam";
    public static final String AUTH_LOGGED_IN = "Ora sei loggato!";
    // ERRORS
    public static final String AUTH_USERNAME_AND_EMAIL_CONFLICT = "Email e Username già in uso, ritenta!";
    public static final String AUTH_EMAIL_CONFLICT = "Email già in uso, ritenta!";
    public static final String AUTH_USERNAME_CONFLICT = "Username già in uso, ritenta!";
    public static final String AUTH_INVALID_EMAIL = "Inserire una mail valida!";
    public static final String AUTH_SOMETHING_WENT_WRONG = "Qualcosa è andato storto!";
    public static final String AUTH_EMAIL_ERR = "Oops! Email errata, riprova!";
    public static final String AUTH_ACCOUNT_NOT_EXISTS = "Oops! Non esiste nessun account che corrisponda ai dati inseriti, riprova!";
    public static final String AUTH_USERNAME_ERR = "Oops! Username errato, riprova!";
    public static final String AUTH_GO_TO_MAIL = "Vai alla tua mail per attivare il tuo account prima di accedere";
    public static final String AUTH_PASS_ERR = "Oops! Password errata, riprova!";

    // FUNCTIONS
    public static final String AUTH_INVALID_USERNAME = """
            Inserire uno username valido!
            \nInizia con una lettera minuscola ([a-z]).
            \nContiene almeno un numero ((?=.*[0-9])).
            \nHa una lunghezza totale compresa tra 6 e 15 caratteri ({5,14}).
            """;
    public static final String AUTH_INVALID_PASSWORD = """
            Inserire una password valida!
            \nChe inizi con una lettera (sia maiuscola che minuscola).
            \nContenga almeno un numero.
            \nContenga almeno un carattere speciale tra '!@#$%^&*.'
            \nSia lunga da 8 a 25 caratteri.
            \nNon contenga altri caratteri speciali se non quelli specificati.
            """;
    /* *********************************************************************** */




    /* *************************  VERIFICATION_TOKEN  ************************ */
    // CONTROLLER
    public static final String VTK_REQ_MAP = API.GEN_REQ_VERSION + "email";
    public static final String VTK_REQ_ACTIVE = "/activation";
    public static final String VTK_REQ_RECOVER = "/sendRecoveryMail";
    public static final String VTK_REQ_CONF_RECOVER = "/confirmRecoverPassword";
    public static final String VTK_REQ_DEL_BY_TKN = "/deleteTokenByToken";
    // SERVICE
    // SEND EMAIL
    public static final String VTK_TYPE_A = "activation";
    public static final String VTK_TYPE_B = "recovery";

    // EXPIRE
    public static final int VTK_EXP_DATE = 1440;

    // MIME MESSAGE
    public static final String VTK_RSN_ACTIVE = "Account activation";
    public static final String VTK_RSN_RECOVERY = "Password recovery";
    public static final String VTK_CONF = "Confermato!";

    // SUCCESS
    public static final String VTK_SUCCESS_SEND_MAIL = "Email inviata correttamente, controlla la tua mail! (se non la trovi guarda in spam)";
    public static final String VTK_VALIDATED = "Account verificato con successo!";
    public static final String VTK_SUCCESS_DELETION = "Eliminazione avvenuta con successo!";

    // ERRORS
    public static final String VTK_ERR_SEND_MAIL = "C'e' stato un errore nell'invio della mail";
    public static final String VTK_ERR_DONE_ALREADY = "Procedura già avviata controlla la tua posta in arrivo o qualora non ci fosse la tua cartella spam!";
    public static final String VTK_ERR_CONF_ALREADY = "Email gia confermata!";
    public static final String VTK_ERR_TKN_EXPIRED_REG = "Token scaduto! Procedere nuovamente alla registrazione se si desidera creare un account";
    public static final String VTK_ERR_TKN_NOT_FOUND = "Token non trovato";
    public static final String VTK_ERR_TKN_CONF_ALREADY = "Token gia confermato! Ripetere la procedura da capo se si desidera cambiare nuovamente la password!";
    public static final String VTK_ERR_TKN_EXPIRED_RECOVERY = "Token scaduto! Ripetere la procedura da capo se si desidera cambiare nuovamente la password!";
    public static final String VTK_NOT_VALIDATED = "Account Non Verificato!";
    public static final String VTK_REC_MAIL_DEL_REQ = "Richiesta di recupero password cancellata con successo";
    public static final String VTK_REC_MAIL_DEL_REQ_BROKEN = "Richiesta di recupero password precedente non trovata, contattare il supporto tecnico";

    // FUNCTIONS
    public static String VTK_subject(String reason){
        return "Office Oasis: " + reason;
    }

    //MIME MESSAGE
    public static String VTK_txt_activation(String username, String token) {
        Properties properties = new Properties();
        try (InputStream inputStream = API.class.getClassLoader().getResourceAsStream("secrets.properties")) {
            properties.load(inputStream);
            String corsOrigin = properties.getProperty("allowed.origin");
            return "Ciao " + username + ", Ti manca ancora un passaggio per completare la tua registrazione, " +
                    "\nClicca sul link sottostante per attivare il tuo account!" +
                    "\n" +
                    "\n" + corsOrigin + "/OfficeOasis/auth/login/" + token;
        } catch (IOException e) {
            return null;
        }
    }

    public static String VTK_txt_recovery(
            String username,
            String token) {
        Properties properties = new Properties();
        try (InputStream inputStream = API.class.getClassLoader().getResourceAsStream("secrets.properties")) {
            properties.load(inputStream);
            String corsOrigin = properties.getProperty("allowed.origin");
            return "Ciao " + username + ", Abbiamo ricevuto la tua richiesta di recupero della password, " +
                    "\nNon possiamo accedere direttamente alla tua password," +
                    "\nti invitiamo dunque ad accedere al link designato per reimpostarla" +
                    "\n" +
                    "\n" + corsOrigin + "/OfficeOasis/auth/passwordRecovery/" + token;
        } catch (IOException e) {
            return null;
        }
    }

    public static String VTK_setResp(String username, boolean isEnabled){
        String resp;
        if (isEnabled){
            resp = VTK_VALIDATED;
        }
        else{
            resp = VTK_NOT_VALIDATED;
        }
        return "Stato validazione " + username + ": " + resp;
    }
    /* *********************************************************************** */




    /* ********************************  CART  ******************************* */
    // CONTROLLER
    public static final String CART_REQ_MAP = API.GEN_REQ_VERSION + "cart";
    public static final String CART_COUNT = "/countCart";

    // SERVICE
    public static final String CART_COUNT_SUCCESS = "Conteggio count completato con successo";

    // FUNCTIONS
    /* *********************************************************************** */




    /* ********************************  IMAGE  ****************************** */
    // CONTROLLER
    public static final String IMG_REQ_MAP = API.GEN_REQ_VERSION + "image";
    public static final String IMG_CREATE = "/create";
    public static final String IMG_FILE_SYSTEM = "/read";

    // SERVICE
    public static final String IMG_FOLDER_PATH = System.getProperty("user.dir") + "/src/main/resources/images/";
    public static final String IMG_TYPE_PROFILE = "profile/";
    public static final String IMG_CREATE_SUCCESS = "Immagine salvata con successo!";
    public static final String IMG_CREATE_ERR = "Immagine non salvata";

    // FUNCTIONS
    /* *********************************************************************** */


    



    /* ************************  COLOR_IMAGE_PRODUCT  ************************ */
    // CONTROLLER
    public static final String COL_PROD_REQ_MAP = API.GEN_REQ_VERSION + "productDetails";
    public static final String COL_PROD_DET = "/details";

    // SERVICE
    public static final String COL_PROD_SUCCESS = "Conteggio dei prodotti aggiornato con successo";


    // FUNCTIONS
    /* *********************************************************************** */




    /* *******************************  HISTORY  ***************************** */
    // CONTROLLER
    public static final String HIST_REQ_MAP = API.GEN_REQ_VERSION + "history";
    // CONTROLLER
    public static final String HIST_POPULAR_PRODS = "/popularProducts";
    // CONTROLLER
    public static final String HIST_ALL_BY_UID = "/getAllByUserId";

    // SERVICE
    public static final String HIST_CREATE_SUCCESS = "Carrello Salvato con successo";

    // FUNCTIONS
    /* *********************************************************************** */




    /* *******************************  PRODUCT  ***************************** */
    // CONTROLLER
    public static final String PROD_REQ_MAP = API.GEN_REQ_VERSION + "product";
    // CONTROLLER
    public static final String PROD_NEW = "/newProducts";
    // CONTROLLER
    public static final String PROD_SEARCH = "/search";
    // CONTROLLER
    public static final String PROD_BY_CATEGORY = "/filterByCategory";

    // SERVICE
    public static final String PROD_SUCCESS_FILT_CATEG = "Prodotti trovati";
    public static final String PROD_IS_EMPTY = "Prodotti non trovati per la categoria selezionata";

    // FUNCTIONS
    /* *********************************************************************** */




    /* *******************************  REVIEW  ****************************** */
    // CONTROLLER
    public static final String REV_REQ_MAP = API.GEN_REQ_VERSION + "review";
    public static final String REV_GET_ALL_BY_PID = "/getAllByProductId";

    // SERVICE
    public static final String REV_CREATE_SUCCESS = "Abbiamo salvato la tua recensione";
    public static final String REV_CREATE_ERROR = "Errore nel salvataggio della recensione";

    // FUNCTIONS
    /* *********************************************************************** */
}

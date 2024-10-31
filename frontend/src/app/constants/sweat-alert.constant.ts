/** Email */
export const EMAIL = {
  SENT: 'Email inviata correttamente, controlla la tua mail! (se non la trovi guarda in spam)',
  CONFIRM: 'Stiamo aprendo una nuova finestra dove dovrai accedere alla tua mail per attivare il tuo account!',
  PASS_RECOVERY: "Pass Recovery",
  CANT_RECOVER: "Non puoi recuperare la password se prima non esegui il logout dal tuo secondo account!",
};

/** Registration */
export const REGISTER = {
  ERROR: "Si è verificato un errore durante la registrazione.",
  SUCCESS: 'Account creato correttamente',
};

/** Login */
export const LOGIN = {
  SUCCESS: "Ora sei loggato!",
  ERROR: "Errore durante il login. Per favore, riprova.",
  INFO: 'Hai già eseguito il login!',
  WARNING_NO_REG: "Non puoi registrarti o eseguirne un altro se prima non esegui il logout!",
  WARNING_NO_ACC: "Non puoi accedere a questa pagina senza eseguire prima il login!",
  MUST: "Devi fare il login!",
};

/** *************** Sweat Alert *************** */
/** Icons */
export const ICO_ERROR = "error";
export const ICO_INFO = "info";
export const ICO_WARNING = "warning";
export const ICO_SUCCESS = "success";
export const ICO_QUESTION = "question";

/** Titles */
export const TIT_ERROR = "Oops...";
export const TIT_INFO = "Informazione gratuita!";
export const TIT_WARNING = "Attenzione!";
export const TIT_SUCCESS = "Hai avuto successo!";
export const TIT_QUESTION = "Ho un dubbio!";

export const DAMN_CAT: string[] = [
    "#fff url(https://sweetalert2.github.io/images/trees.png)",
    `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
    `
] 

/** GENERIC */
export const ERR_GENERIC = "Qualcosa è andato storto!";